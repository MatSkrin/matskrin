# MatSkrin

Web app pendamping buku ajar *Penyakit Jantung pada Kehamilan*: modul pengetahuan per bab dan kalkulator penilaian risiko (mWHO, CARPREG II, ZAHARA).

## Menjalankan

```bash
npm install
npm run dev     # server pengembangan
npm test        # uji logika skor risiko
npm run build   # hasil statis di dist/
```

## Menambah atau mengubah materi

Setiap bab adalah satu pelajaran interaktif (MDX) di `src/content/pelajaran/NN-slug.mdx`, berisi `meta` (nomor, judul, ringkasan), `pustaka` (daftar pustaka Vancouver), dan kartu `<LessonCard>` per subbab. Sitasi cukup ditulis `[1]`, `[1,2]`, atau `[1–3]`.

Bab baru dari naskah dapat dikonversi dari Markdown (format `docs/contoh-format-bab.md`) dengan:

```bash
python3 scripts/md2mdx.py src/content/pelajaran path/ke/NN-slug.md
```

Komponen yang tersedia dan aturan isinya dijelaskan di `docs/pelajaran-interaktif.md`.

## Skor risiko

Kriteria ada di `src/data/risk.ts`, logika di `src/lib/risk.ts`. Kriteria belum diverifikasi terhadap pedoman ESC 2025; app menampilkan peringatan sampai verifikasi selesai.

## Deploy

Push ke `main` akan membangun dan menerbitkan ke GitHub Pages lewat `.github/workflows/deploy.yml` (aktifkan Settings → Pages → Source: GitHub Actions).

Alat bantu edukasi; tidak menggantikan penilaian klinis.
