import type { ReactNode } from 'react'
import { Glosarium } from '@/components/Istilah'
import { KELUHAN_WAJAR } from '../../data/panduan'
import { DadaInteraktif } from './Dada'
import { EkgTujuhLangkah } from './Ekg'
import { BentukBising, CekFungsional, SkalaLevine, UrutanAuskultasi } from './Siklus'

export function Acuan({ judul, children, buka = false }: { judul: string; children: ReactNode; buka?: boolean }) {
  return (
    <details className="acuan" open={buka}>
      <summary>{judul}</summary>
      <div className="acuan-isi prose"><Glosarium>{children}</Glosarium></div>
    </details>
  )
}

export function AcuanLangsung({ judul, children }: { judul?: string; children: ReactNode }) {
  return (
    <>
      {judul && <h3>{judul}</h3>}
      <div className="acuan-langsung prose"><Glosarium>{children}</Glosarium></div>
    </>
  )
}

export function AcuanRiwayat() {
  return (
    <Acuan judul="Mengapa ditanyakan?">
      <p>
        Ibu dengan riwayat penyakit jantung perlu dirujuk ke SpJP untuk stratifikasi risiko, idealnya sejak awal
        kehamilan, walaupun saat ini tanpa keluhan. Faktor risiko kardiometabolik dihitung sebagai temuan kuning dan
        dinilai bersama gejala serta tanda vital.
      </p>
    </Acuan>
  )
}

export function AcuanGejala() {
  return (
    <AcuanLangsung>
      <div className="banding">
        <div className="hijau">
          <b>Wajar bila ringan dan tidak progresif</b>
          <ul>{KELUHAN_WAJAR.map((k) => <li key={k}>{k}</li>)}</ul>
        </div>
        <div className="kuning">
          <b>Waspada</b>
          <ul>
            <li>Sesak saat istirahat, ortopnea, atau PND</li>
            <li>Sesak yang makin berat, tidak sebanding usia kehamilan</li>
            <li>Nyeri dada, sinkop, atau berdebar sampai hampir pingsan</li>
          </ul>
        </div>
      </div>
      <p>
        Yang menentukan bukan jenis keluhannya, melainkan <strong>derajat, progresivitas, dan kombinasinya</strong> dengan
        temuan fisik dan EKG.
      </p>
    </AcuanLangsung>
  )
}

export function AcuanVital() {
  return (
    <Acuan judul="Cara mengukur dan ambang batas">
      <p>Ukur saat istirahat dalam posisi duduk atau miring kiri, dan ulangi bila abnormal.</p>
      <table>
        <thead><tr><th>Parameter</th><th>Kuning</th><th>Merah</th></tr></thead>
        <tbody>
          <tr><td>Nadi (kali/menit)</td><td>≥ 110</td><td>≥ 120</td></tr>
          <tr><td>TD sistolik (mmHg)</td><td>≥ 140</td><td>≥ 160 atau &lt; 90</td></tr>
          <tr><td>Laju napas (kali/menit)</td><td>≥ 24</td><td>≥ 25</td></tr>
          <tr><td>SpO₂</td><td>≤ 96%</td><td>≤ 94%</td></tr>
        </tbody>
      </table>
      <p className="muted">
        Ambang kuning dinilai dalam kombinasi, bukan pemicu tunggal. Beberapa sumber memakai RR ≥ 30 untuk merah. Ambang
        ini diadaptasi dari ACOG 2023 dan CMQCC 2017; pedoman ESC 2025 tidak menetapkan ambang triase antenatal.
      </p>
      <p>
        <strong>Tanda gagal jantung akut berat menurut ESC 2025:</strong> TD sistolik &lt; 90 mmHg, nadi &gt; 130 atau
        &lt; 45 kali/menit, laju napas &gt; 25 kali/menit, SpO₂ &lt; 90%, atau laktat &gt; 2 mmol/L. Stabilisasi dan rujuk
        segera.
      </p>
    </Acuan>
  )
}

export function AcuanAuskultasi() {
  return (
    <>
      <h3>Langkah auskultasi</h3>
      <Acuan judul="1. Persiapan: posisi dan stetoskop">
        <ol>
          <li><strong>Semi-Fowler 30–45° atau miring kiri</strong> sebagai posisi dasar. Hindari telentang datar lama pada kehamilan lanjut.</li>
          <li><strong>Dekubitus lateral kiri</strong> untuk apeks: bell ditempel ringan untuk rumble stenosis mitral, S3, S4.</li>
          <li><strong>Duduk condong ke depan, ekspirasi ditahan</strong> untuk tepi sternum kiri: bising regurgitasi aorta lebih jelas.</li>
        </ol>
        <p><strong>Diafragma</strong> (ditekan): nada tinggi, yaitu S1, S2, klik, bising sistolik, regurgitasi aorta. <strong>Bell</strong> (ditempel): nada rendah, yaitu S3, S4, rumble stenosis mitral.</p>
        <p>Stetoskop langsung di kulit, ruang tenang, dan raba nadi sambil mendengar untuk memastikan sistol dan diastol.</p>
      </Acuan>
      <Acuan judul="2. Lima area auskultasi" buka>
        <DadaInteraktif mode="auskultasi" />
      </Acuan>
      <Acuan judul="3. Urutan: satu hal pada satu waktu">
        <UrutanAuskultasi />
        <p>Takikardia kehamilan memendekkan diastol sehingga rumble stenosis mitral mudah terlewat. Cari dengan bell di apeks, posisi miring kiri, saat ekspirasi.</p>
      </Acuan>
      <h3>Acuan bunyi dan bising</h3>
      <Acuan judul="Kenali bunyi tambahan dan bentuk bising">
        <p>Pilih jenis bunyi untuk melihat letaknya dalam satu siklus jantung.</p>
        <BentukBising />
      </Acuan>
      <Acuan judul="Bunyi jantung: normal vs curigai">
        <table>
          <thead><tr><th></th><th>Normal pada kehamilan</th><th>Curigai bila</th></tr></thead>
          <tbody>
            <tr><td>S1</td><td>Lebih keras; split lebih jelas</td><td>Sangat keras + opening snap/rumble → stenosis mitral</td></tr>
            <tr><td>S2</td><td>Split fisiologis (melebar saat inspirasi)</td><td>Split lebar menetap (ASD), P2 keras (HP), S2 tunggal</td></tr>
            <tr><td>S3</td><td>Dapat terdengar pada ibu tanpa keluhan</td><td>S3 + sesak/ortopnea, takikardia, atau ronki → gagal jantung</td></tr>
            <tr><td>S4</td><td>Tidak lazim</td><td>Setiap S4 → evaluasi</td></tr>
            <tr><td>Klik / OS</td><td>Tidak ada</td><td>Klik ejeksi (bikuspid, PS); opening snap (MS)</td></tr>
          </tbody>
        </table>
      </Acuan>
      <Acuan judul="Skala Levine dan ciri bising fungsional">
        <SkalaLevine />
        <CekFungsional />
        <p>Venous hum (kontinu, supraklavikula kanan, hilang bila vena jugularis ditekan) dan mammary souffle (trimester 2–3 dan laktasi, berkurang bila stetoskop ditekan) adalah bising kontinu yang jinak. Bila ragu, anggap belum jinak.</p>
      </Acuan>
      <Acuan judul="Manuver sederhana">
        <table>
          <thead><tr><th>Manuver</th><th>Efek</th></tr></thead>
          <tbody>
            <tr><td>Inspirasi dalam</td><td>Bising sisi kanan (TR/PS) mengeras</td></tr>
            <tr><td>Miring kiri + bell di apeks</td><td>Rumble MS, S3, S4 lebih jelas</td></tr>
            <tr><td>Duduk condong + ekspirasi ditahan</td><td>Bising regurgitasi aorta lebih jelas</td></tr>
            <tr><td>Valsalva singkat (opsional)</td><td>Bising kardiomiopati hipertrofik mengeras; hentikan bila ibu pusing</td></tr>
            <tr><td>Tekan vena jugularis / tekan stetoskop</td><td>Venous hum hilang / mammary souffle berkurang</td></tr>
          </tbody>
        </table>
      </Acuan>
    </>
  )
}

export function AcuanEKG() {
  return (
    <>
      <Acuan judul="Merekam EKG 12-sadapan dengan benar">
        <DadaInteraktif mode="ekg" />
        <ul>
          <li>Posisi telentang; V1–V2 di ICS 4 tepi sternum (hitung dari sudut Louis = ICS 2); V4 di ICS 5 linea midklavikula; V5–V6 sejajar V4.</li>
          <li>Pada perempuan, elektroda V4–V6 diletakkan di bawah payudara.</li>
          <li>Kalibrasi 10 mm/mV, 25 mm/s; tulis identitas dan usia kehamilan.</li>
        </ul>
        <p><strong>Kesalahan yang menyesatkan:</strong> V1–V2 terlalu tinggi menghasilkan pola mirip RBBB inkomplet/ASD; kabel lengan tertukar membuat P dan QRS negatif di I sehingga tampak seperti RAD.</p>
      </Acuan>
      <AcuanLangsung judul="Membaca EKG dalam 7 langkah">
        <p>Ikuti urutan yang sama setiap kali membaca. Ketuk langkah untuk melihat bagian EKG yang dinilai.</p>
        <EkgTujuhLangkah />
      </AcuanLangsung>
      <Acuan judul="Varian normal EKG kehamilan">
        <table>
          <thead><tr><th>Parameter</th><th>Normal pada kehamilan</th><th>Bukan varian bila</th></tr></thead>
          <tbody>
            <tr><td>Frekuensi</td><td>Naik 10–20 kali/menit</td><td>≥ 110 menetap</td></tr>
            <tr><td>PR</td><td>Sedikit memendek (±20 ms)</td><td>PR pendek + gelombang delta</td></tr>
            <tr><td>Aksis</td><td>Bergeser ke kiri 15–20°</td><td>Di luar −30° s/d +90°</td></tr>
            <tr><td>Gelombang Q</td><td>Q dapat tampak jelas di II, III, aVF</td><td>Q lebar/dalam di sadapan lain</td></tr>
            <tr><td>Gelombang T</td><td>Datar/inversi di III, aVF, V1, V2, V3</td><td>Inversi dalam di I, aVL, V5–V6</td></tr>
            <tr><td>ST-T</td><td>Perubahan nonspesifik ringan</td><td>ST elevasi/depresi bermakna</td></tr>
            <tr><td>QTc</td><td>Umumnya tidak berubah</td><td>≥ 460 ms</td></tr>
            <tr><td>Irama</td><td>Sinus; ekstrasistol terisolasi</td><td>AF, flutter, SVT, VT</td></tr>
          </tbody>
        </table>
      </Acuan>
      <Acuan judul="Palpitasi dan ekstrasistol: edukasi atau rujuk?">
        <p><strong>Cukup edukasi dan evaluasi ulang</strong> bila semua terpenuhi: ekstrasistol terisolasi, tanpa presinkop/sinkop, tanpa penyakit jantung struktural, auskultasi dan SpO₂ normal, EKG lain normal.</p>
        <p><strong>Rujuk/konsultasi SpJP (Holter)</strong>, dengan ambang rendah untuk Holter jangka panjang pada sinkop atau palpitasi (ESC 2025), bila: palpitasi dengan hampir pingsan atau sinkop, takikardia reguler cepat berulang, ekstrasistol sangat sering/berpasangan/beruntun, ada penyakit jantung struktural atau riwayat keluarga kematian mendadak, atau EKG lain abnormal.</p>
      </Acuan>
    </>
  )
}
