# Pelajaran interaktif (MDX)

Setiap bab adalah satu file `src/content/pelajaran/<slug>.mdx` yang tampil di `/modul/<slug>`. Daftar isi dan hitungan progres dibaca dari atribut `<LessonCard id nomor judul>`. Paragraf pembuka sebelum subbab pertama ditaruh di kartu "Pendahuluan".

- **Konten** (teks, tabel, data kuis) ada di `src/content/pelajaran/`. **Komponen** ada di `src/components/belajar/` dan `src/components/ui/` (gaya shadcn/ui).
- Sitasi ditulis seperti di naskah: `[1]`, `[1,2]`, `[1–3]`. Plugin `src/lib/remark-sitasi.ts` mengubahnya menjadi popover berisi rujukan dari `export const pustaka`.
- Komponen yang tersedia di MDX: `Ringkasan`, `LessonCard` (satu subbab), `PoinKlinis`, `RekomendasiESC`, `TabelBukti`, `TanggaMWHO`, `SkorCarpreg`, `Kuis`.
- Elemen yang tetap tampil di mode **Ringkas klinis** diberi kelas `kunci` (Poin Klinis, rekomendasi ESC, tabel, ilustrasi). Paragraf narasi dan kuis disembunyikan.
- Progres (kartu selesai, jawaban kuis) disimpan di `localStorage` peramban dengan kunci `matskrin:progres:v1`. Tidak ada akun atau server.
- Aturan isi: teks klinis disalin apa adanya dari bab.
- Kuis: setiap bab ditutup kartu `<LessonCard id="kuis" nomor="Kuis" judul="Uji Pemahaman" latihan>` berisi `<Kuis soal={kuis} />`. Soal ada di `src/content/pelajaran/kuis/NN.ts` (id `bN-qM`). Level dokter umum dan bersifat *recall*: jawaban dan pembahasan hanya bersandar pada isi bab itu, dengan nomor sitasi yang sama. `kasus` (vinyet klinis) opsional. `src/lib/kuis.test.ts` memeriksa kunci jawaban, id unik, dan nomor sitasi.
