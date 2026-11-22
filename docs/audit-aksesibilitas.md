# Audit aksesibilitas & UI (23 Nov 2026)

Standar: WCAG 2.1 AA. Alat: axe-core 4 (aturan wcag2a/2aa/21a/21aa + best-practice) di Chromium, 7 halaman × mode terang/gelap × lebar 1280/375 px; uji keyboard; reflow 320 px.

| Temuan | Kriteria | Perbaikan |
|---|---|---|
| Teks putih di tangga mWHO (kelas tidak aktif, opacity 55%) kontras 1,7–2,5:1 | 1.4.3 | Warna anak tangga digelapkan (≥ 5,9:1), tanpa opacity |
| Tombol utama mode gelap: putih di #e4707f = 3,0:1 | 1.4.3 | Token `--on-accent` (teks gelap di mode gelap, 6,1:1) |
| Pil "KUNING" #a86b00 di #fff4d6 = 4,0:1 | 1.4.3 | #845400 (5,9:1) |
| Teks hijau di latar hijau muda = 4,4:1 | 1.4.3 | `--ok`/`--poin-line` #276b4d (5,6:1) |
| Tag kelas II mode gelap = 3,4:1 | 1.4.3 | Memakai `--poin-line` mode gelap (7,5:1) |
| Tabel yang bisa digulir tidak bisa difokus keyboard | 2.1.1 | `tabIndex=0` pada tabel |
| Tidak ada gaya fokus global | 2.4.7 | `:focus-visible` dengan outline aksen |
| Tidak ada tautan lewati navigasi | 2.4.1 | "Lewati ke konten" |
| Judul tab selalu "MatSkrin" | 2.4.2 | Judul per halaman/bab |
| Halaman Skor Risiko melebar di 320 px | 1.4.10 | Grid `minmax(0,1fr)`, tag kelas boleh membungkus |
| Tab mWHO: semua tab masuk urutan Tab | 4.1.2 / pola ARIA tabs | Roving tabindex, panah/Home/End |
| Gulir halus mengabaikan preferensi gerak | 2.3.3 (AAA, praktik baik) | Hormati `prefers-reduced-motion` |
| Tombol kecil di ponsel (32 px) | 2.5.5 (AAA) | 40 px di ponsel |

Hasil akhir axe: 0 pelanggaran di semua kombinasi. Belum diuji dengan pembaca layar sungguhan (VoiceOver/NVDA).

Perbaikan desain/UX copy: nama halaman disamakan dengan menu (Modul, Checklist Puskesmas, Skor Risiko); CTA berupa kata kerja; label kecil tidak lagi huruf kapital semua; beranda menampilkan ikon menu dan kartu "Lanjutkan belajar".
