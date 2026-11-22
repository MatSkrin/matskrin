# Pelajaran interaktif (MDX)

Bab yang punya file `src/content/pelajaran/<slug>.mdx` otomatis tampil sebagai pelajaran interaktif di `/modul/<slug>`; bab lain tetap memakai Markdown di `src/content/bab/`.

- **Konten** (teks, tabel, data kuis) ada di `src/content/pelajaran/`. **Komponen** ada di `src/components/belajar/` dan `src/components/ui/` (gaya shadcn/ui).
- Sitasi ditulis seperti di naskah: `[1]`, `[1,2]`, `[1–3]`. Plugin `src/lib/remark-sitasi.ts` mengubahnya menjadi popover berisi rujukan dari `export const pustaka`.
- Komponen yang tersedia di MDX: `Ringkasan`, `LessonCard` (satu subbab), `PoinKlinis`, `RekomendasiESC`, `TabelBukti`, `TanggaMWHO`, `SkorCarpreg`, `Kuis`.
- Elemen yang tetap tampil di mode **Ringkas klinis** diberi kelas `kunci` (Poin Klinis, rekomendasi ESC, tabel, ilustrasi). Paragraf narasi dan kuis disembunyikan.
- Progres (kartu selesai, jawaban kuis) disimpan di `localStorage` peramban dengan kunci `matskrin:progres:v1`. Tidak ada akun atau server.
- Aturan isi: teks klinis disalin apa adanya dari bab; soal kuis hanya bersandar pada kalimat/tabel bab itu dengan nomor sitasi yang sama, dan ditinjau penulis sebelum terbit.
