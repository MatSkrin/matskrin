# Jantung & Kehamilan

Web app pendamping buku ajar *Penyakit Jantung pada Kehamilan*: modul pengetahuan per bab dan kalkulator penilaian risiko (mWHO, CARPREG II, ZAHARA).

## Menjalankan

```bash
npm install
npm run dev     # server pengembangan
npm test        # uji logika skor risiko
npm run build   # hasil statis di dist/
```

## Menambah atau mengubah materi

Setiap bab adalah satu berkas Markdown di `src/content/bab/`, diawali frontmatter:

```markdown
---
nomor: 4
judul: Deteksi Dini, Skrining, dan Rujukan
ringkasan: Satu kalimat untuk daftar modul.
---
```

Kotak **Poin Klinis** dibuat dengan blockquote yang diawali tulisan tebal `**Poin Klinis 4.1**`. Lihat `docs/contoh-format-bab.md`.

## Skor risiko

Kriteria ada di `src/data/risk.ts`, logika di `src/lib/risk.ts`. Kriteria belum diverifikasi terhadap pedoman ESC 2025; app menampilkan peringatan sampai verifikasi selesai.

## Deploy

Push ke `main` akan membangun dan menerbitkan ke GitHub Pages lewat `.github/workflows/deploy.yml` (aktifkan Settings → Pages → Source: GitHub Actions).

Alat bantu edukasi; tidak menggantikan penilaian klinis.
