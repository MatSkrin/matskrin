import type { ReactNode } from 'react'
import { KELUHAN_WAJAR } from '../../data/panduan'

export function Acuan({ judul, children, buka = false }: { judul: string; children: ReactNode; buka?: boolean }) {
  return (
    <details className="acuan" open={buka}>
      <summary>{judul}</summary>
      <div className="acuan-isi prose">{children}</div>
    </details>
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
    <Acuan judul="Keluhan wajar vs tanda waspada">
      <p><strong>Wajar bila ringan dan tidak progresif:</strong></p>
      <ul>{KELUHAN_WAJAR.map((k) => <li key={k}>{k}</li>)}</ul>
      <p>
        Yang menentukan bukan jenis keluhannya, melainkan <strong>derajat, progresivitas, dan kombinasinya</strong> dengan
        temuan fisik dan EKG.
      </p>
    </Acuan>
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
      <p className="muted">Ambang kuning dinilai dalam kombinasi, bukan pemicu tunggal. Beberapa sumber memakai RR ≥ 30 untuk merah.</p>
    </Acuan>
  )
}

export function AcuanAuskultasi() {
  return (
    <>
      <Acuan judul="1. Persiapan: posisi dan stetoskop">
        <ol>
          <li><strong>Semi-Fowler 30–45° atau miring kiri</strong> sebagai posisi dasar. Hindari telentang datar lama pada kehamilan lanjut.</li>
          <li><strong>Dekubitus lateral kiri</strong> untuk apeks: bell ditempel ringan untuk rumble stenosis mitral, S3, S4.</li>
          <li><strong>Duduk condong ke depan, ekspirasi ditahan</strong> untuk tepi sternum kiri: bising regurgitasi aorta lebih jelas.</li>
        </ol>
        <p><strong>Diafragma</strong> (ditekan): nada tinggi, yaitu S1, S2, klik, bising sistolik, regurgitasi aorta. <strong>Bell</strong> (ditempel): nada rendah, yaitu S3, S4, rumble stenosis mitral.</p>
        <p>Stetoskop langsung di kulit, ruang tenang, dan raba nadi sambil mendengar untuk memastikan sistol dan diastol.</p>
      </Acuan>
      <Acuan judul="2. Lima area auskultasi">
        <table>
          <thead><tr><th>Area</th><th>Lokasi</th><th>Yang dicari</th></tr></thead>
          <tbody>
            <tr><td>A · Aorta</td><td>ICS 2 parasternal kanan</td><td>Stenosis aorta; penjalaran ke karotis</td></tr>
            <tr><td>P · Pulmonal</td><td>ICS 2 parasternal kiri</td><td>Bising aliran kehamilan, ASD, stenosis pulmonal; nilai P2</td></tr>
            <tr><td>E · Erb</td><td>ICS 3 parasternal kiri</td><td>Regurgitasi aorta/pulmonal (duduk condong, ekspirasi)</td></tr>
            <tr><td>T · Trikuspid</td><td>ICS 4–5 parasternal kiri</td><td>Regurgitasi trikuspid, VSD</td></tr>
            <tr><td>M · Mitral</td><td>Apeks, ICS 5 linea midklavikula kiri</td><td>MR (menjalar ke aksila); MS (bell, miring kiri)</td></tr>
          </tbody>
        </table>
        <p>Area tambahan: karotis (penjalaran AS), supraklavikula kanan (venous hum), infraklavikula kiri (PDA), aksila kiri (penjalaran MR). Pada kehamilan lanjut, tentukan apeks dengan meraba iktus.</p>
      </Acuan>
      <Acuan judul="3. Urutan: satu hal pada satu waktu">
        <ol>
          <li>Tentukan S1 dan S2 (sambil meraba karotis)</li>
          <li>Nilai S1: intensitas, split</li>
          <li>Nilai S2: split dan P2</li>
          <li>Bunyi tambahan: klik, S3, S4, opening snap</li>
          <li>Bising sistolik: fase, bentuk, derajat</li>
          <li>Bising diastolik: <strong>cari aktif</strong></li>
          <li>Bising kontinu: melewati S2?</li>
        </ol>
        <p>Takikardia kehamilan memendekkan diastol sehingga rumble stenosis mitral mudah terlewat. Cari dengan bell di apeks, posisi miring kiri, saat ekspirasi.</p>
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
        <table>
          <tbody>
            <tr><td>1/6</td><td>Sangat lemah; terdengar setelah berkonsentrasi</td></tr>
            <tr><td>2/6</td><td>Lemah, tetapi langsung terdengar</td></tr>
            <tr><td>3/6</td><td>Cukup keras, tanpa thrill → <strong>rujuk</strong></td></tr>
            <tr><td>4/6</td><td>Keras, dengan thrill</td></tr>
            <tr><td>5/6</td><td>Terdengar dengan stetoskop sebagian menempel</td></tr>
            <tr><td>6/6</td><td>Terdengar dengan stetoskop terangkat dari dada</td></tr>
          </tbody>
        </table>
        <p><strong>Bising fungsional dianggap aman bila semua terpenuhi:</strong></p>
        <ul>
          <li>Mid-sistolik tipe ejeksi, ≤ 2/6, tanpa thrill</li>
          <li>Di basis/tepi sternum kiri atas, tidak menjalar</li>
          <li>S2 normal dengan split fisiologis; tanpa klik atau OS; tanpa bising diastolik</li>
          <li>Ibu tanpa keluhan bermakna; tanda vital, SpO₂, dan EKG normal</li>
        </ul>
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
        <ul>
          <li>Posisi telentang; V1–V2 di ICS 4 tepi sternum (hitung dari sudut Louis = ICS 2); V4 di ICS 5 linea midklavikula; V5–V6 sejajar V4.</li>
          <li>Pada perempuan, elektroda V4–V6 diletakkan di bawah payudara.</li>
          <li>Kalibrasi 10 mm/mV, 25 mm/s; tulis identitas dan usia kehamilan.</li>
        </ul>
        <p><strong>Kesalahan yang menyesatkan:</strong> V1–V2 terlalu tinggi menghasilkan pola mirip RBBB inkomplet/ASD; kabel lengan tertukar membuat P dan QRS negatif di I sehingga tampak seperti RAD.</p>
      </Acuan>
      <Acuan judul="Membaca EKG dalam 7 langkah">
        <ol>
          <li><strong>Kualitas</strong>: 25 mm/s, 10 mm/mV, artefak</li>
          <li><strong>Frekuensi</strong>: &gt;100 cari sebab (demam, anemia, nyeri, hipovolemia, tiroid, gagal jantung)</li>
          <li><strong>Irama</strong>: sinus? P di depan tiap QRS?</li>
          <li><strong>Aksis</strong>: −30° s/d +90°; bergeser ke kiri boleh, RAD tidak</li>
          <li><strong>Interval</strong>: PR, QRS, QTc</li>
          <li><strong>Morfologi</strong>: P mitral/pulmonal, voltase hipertrofi, Q patologis</li>
          <li><strong>ST-T</strong>: T inversi III/aVF/V1–V2 boleh; ST elevasi/depresi tidak</li>
        </ol>
      </Acuan>
      <Acuan judul="Varian normal EKG kehamilan">
        <table>
          <thead><tr><th>Parameter</th><th>Normal pada kehamilan</th><th>Bukan varian bila</th></tr></thead>
          <tbody>
            <tr><td>Frekuensi</td><td>Naik 10–20 kali/menit</td><td>≥ 110 menetap</td></tr>
            <tr><td>PR</td><td>Sedikit memendek (±20 ms)</td><td>PR pendek + gelombang delta</td></tr>
            <tr><td>Aksis</td><td>Bergeser ke kiri 15–20°</td><td>Di luar −30° s/d +90°</td></tr>
            <tr><td>Gelombang Q</td><td>Q kecil di III (dapat II, aVF)</td><td>Q lebar/dalam di sadapan lain</td></tr>
            <tr><td>Gelombang T</td><td>Datar/inversi di III, aVF, V1–V2</td><td>Inversi dalam di I, aVL, V5–V6</td></tr>
            <tr><td>ST-T</td><td>Perubahan nonspesifik ringan</td><td>ST elevasi/depresi bermakna</td></tr>
            <tr><td>QTc</td><td>Umumnya tidak berubah</td><td>≥ 460 ms</td></tr>
            <tr><td>Irama</td><td>Sinus; ekstrasistol terisolasi</td><td>AF, flutter, SVT, VT</td></tr>
          </tbody>
        </table>
      </Acuan>
      <Acuan judul="Palpitasi dan ekstrasistol: edukasi atau rujuk?">
        <p><strong>Cukup edukasi dan evaluasi ulang</strong> bila semua terpenuhi: ekstrasistol terisolasi, tanpa presinkop/sinkop, tanpa penyakit jantung struktural, auskultasi dan SpO₂ normal, EKG lain normal.</p>
        <p><strong>Rujuk/konsultasi SpJP (Holter)</strong> bila: palpitasi dengan hampir pingsan atau sinkop, takikardia reguler cepat berulang, ekstrasistol sangat sering/berpasangan/beruntun, ada penyakit jantung struktural atau riwayat keluarga kematian mendadak, atau EKG lain abnormal.</p>
      </Acuan>
    </>
  )
}
