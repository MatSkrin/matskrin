"""Konversi src/content/bab/*.md -> src/content/pelajaran/*.mdx tanpa mengubah teks klinis."""
import json, re, sys, pathlib, unicodedata

def slug(s):
    s = unicodedata.normalize('NFKD', re.sub(r'<[^>]+>', '', s)).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def jsx(html):
    html = html.replace('class="', 'className="')
    html = re.sub(r'style="width:\s*([\d.]+%)"', r"style={{ width: '\1' }}", html)
    html = re.sub(r'<br\s*>', '<br />', html)
    return html

def autolink(t):  # <https://..> tidak didukung MDX; "<" lepas (mis. "<140/90") di-escape
    t = re.sub(r'<(https?://[^>\s]+)>', r'[\1](\1)', t)
    return re.sub(r'(?<!\\)<(?=[^a-zA-Z/!])', '&lt;', t)

def tambah_kunci(line):
    return re.sub(r'className="(gambar[^"]*|rekomendasi|stats)"', lambda m: f'className="{m.group(1)} kunci"', line)

def konversi_isi(lines):
    out, i = [], 0
    while i < len(lines):
        l = lines[i]
        m = re.match(r'^> \*\*(Poin Klinis[^*]*)\*\*\s*$', l)
        if m:
            body = []
            i += 1
            while i < len(lines) and lines[i].startswith('>'):
                body.append(lines[i][2:] if lines[i].startswith('> ') else lines[i][1:])
                i += 1
            out += [f'<PoinKlinis judul={json.dumps(m.group(1).strip().rstrip("."), ensure_ascii=False)}>', '', *[autolink(b) for b in body], '', '</PoinKlinis>']
            continue
        m = re.match(r'^<p class="judul-tabel"><strong>(.*?)</strong>\s*(.*?)</p>\s*$', l)
        if m:
            judul = (m.group(1).strip() + ' ' + re.sub(r'<[^>]+>', '', m.group(2))).strip()
            i += 1
            blok = []
            while i < len(lines) and lines[i].strip() == '':
                i += 1
            while i < len(lines) and (lines[i].startswith('|') or lines[i].startswith('<table') or (blok and blok[-1].startswith('<') and not blok[-1].rstrip().endswith('</table>'))):
                blok.append(lines[i]); i += 1
            j = i
            while j < len(lines) and lines[j].strip() == '':
                j += 1
            cat = []
            while j < len(lines) and lines[j].startswith('<p class="catatan'):
                cat.append(jsx(lines[j])); j += 1
            if cat:
                i = j
            out += [f'<TabelBukti judul={json.dumps(judul, ensure_ascii=False)} terbuka>', '', *[jsx(autolink(b)) if b.startswith('<') else autolink(b) for b in blok], '', *cat, '', '</TabelBukti>']
            continue
        if l.startswith('<'):
            out.append(tambah_kunci(jsx(l)))
        else:
            out.append(autolink(l))
        i += 1
    return out

def konversi(src: pathlib.Path):
    raw = src.read_text()
    fm, body = re.match(r'^---\n(.*?)\n---\n(.*)$', raw, re.S).groups()
    meta = dict(x.split(':', 1) for x in fm.splitlines() if ':' in x)
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    isi, _, pustaka = body.partition('\n## Daftar Pustaka')
    refs = [re.sub(r'<(https?://[^>\s]+)>', r'\1', m) for m in re.findall(r'^\d+\.\s+(.*)$', pustaka, re.M)]

    out = [
        '{/* Dikonversi dari naskah bab (Markdown) tanpa mengubah teks klinis. */}',
        '',
        'export const meta = ' + json.dumps({'nomor': int(meta['nomor']), 'judul': meta['judul'], 'ringkasan': meta.get('ringkasan', '')}, ensure_ascii=False, indent=2),
        '',
        'export const pustaka = ' + json.dumps(refs, ensure_ascii=False, indent=2),
        '',
    ]
    lines = isi.strip('\n').split('\n')
    # Kotak "Inti bab ini"
    if lines and lines[0].startswith('<div class="ringkasan">'):
        end = lines.index('</div>')
        lis = re.findall(r'<li>(.*?)</li>', '\n'.join(lines[:end + 1]), re.S)
        out += ['<Ringkasan>', '', *[f'- {autolink(x.strip())}' for x in lis], '', '</Ringkasan>', '']
        lines = lines[end + 1:]
    # Kartu per "## "
    bagian, sekarang = [], None
    pra = []
    for l in lines:
        if l.startswith('## '):
            sekarang = [l[3:].strip(), []]
            bagian.append(sekarang)
        elif sekarang is None:
            pra.append(l)
        else:
            sekarang[1].append(l)
    if any(x.strip() for x in pra):  # paragraf pembuka sebelum subbab pertama
        out += ['<LessonCard id="pendahuluan" judul="Pendahuluan">', '', *konversi_isi(pra), '', '</LessonCard>', '']
    ids = set()
    for judul, isi_b in bagian:
        m = re.match(r'^(\d+(?:\.\d+)*)\s+(.*)$', judul)
        nomor, teks = (m.group(1), m.group(2)) if m else (None, judul)
        id_ = slug(teks) or 'bagian'
        while id_ in ids: id_ += '-2'
        ids.add(id_)
        attrs = f'id="{id_}"' + (f' nomor="{nomor}"' if nomor else '') + f' judul={json.dumps(teks, ensure_ascii=False)}'
        out += [f'<LessonCard {attrs}>', '', *konversi_isi(isi_b), '', '</LessonCard>', '']
    txt = re.sub(r'\n{3,}', '\n\n', '\n'.join(out)).strip() + '\n'
    return txt

if __name__ == '__main__':
    for p in sys.argv[2:]:
        p = pathlib.Path(p)
        (pathlib.Path(sys.argv[1]) / (p.stem + '.mdx')).write_text(konversi(p))
        print('ok', p.name)
