# PRD: Landing Page Portofolio

**Versi:** 1.2 (siap dieksekusi)  
**Tanggal:** 13 November 2026  
**Pemilik:** Arif Maulana Ade Putra  
**Penyusun:** saya, berdasarkan `00-konsep-landing-page.md`, `01-studi-kasus-excel-makro.md`, dan `design-landing-page-portofolio.md`  
**Status:** isi dan seluruh keputusan terkunci, termasuk tiga jawaban di bagian 15. Siap dieksekusi.

> **Perubahan 1.0 ke 1.1.** Angka dan nama berkas diselaraskan dengan tiga portofolio yang sudah dibangun ulang pada 12 November 2026. Bagian 10 ditambahkan sebagai daftar sumber setiap angka. Empat keputusan tampilan yang tadinya terbuka sudah dikunci di bagian 15 dan dipindahkan ke `design-landing-page-portofolio.md`.
>
> **Perubahan 1.1 ke 1.2.** Tiga keputusan terakhir di bagian 15 dikunci: alamat email, nasib tautan pendek, dan berkas CV. Akibatnya masuk ke daftar periksa, rencana kerja, dan bagian 5.11 dokumen desain. Tidak ada pertanyaan terbuka lagi.

---

## 1. Ringkasan

Halaman ini menggantikan portofolio PDF sebagai pintu masuk utama, dan isinya tiga hal yang Anda kerjakan sendiri: aplikasi web pemantauan program, server tempat aplikasi itu hidup, serta dashboard Excel yang jadi cetak birunya. Bentuknya satu halaman statis tanpa build step, jadi bisa dibuka langsung dari folder lewat `file://` maupun ditaruh di server M710s kalau nanti mau dipublikasikan.

Yang perlu ditegaskan sejak awal, halaman ini bukan daftar teknologi. Isinya cerita tentang orang yang menerjemahkan aturan Juknis jadi perilaku sistem yang bisa diuji, lalu merawat mesinnya sendiri.

Ada satu hal yang harus ditulis jujur di halaman: aturan capaian bukan buatan Anda. Sumbernya Juknis Penjangkauan dan Rujukan PR Spiritia 2024, dan di level SR tugas Anda menjalankan serta mengimplementasikannya. Ini bukan pelemahan cerita, justru sebaliknya. Rekruter yang pernah bekerja di program Global Fund akan langsung tahu bedanya, dan mengaku sebagai penulis aturan malah merusak kredibilitas. Yang layak dipamerkan adalah seberapa ketat aturan itu dijaga saat diterjemahkan jadi kode.

---

## 2. Masalah yang mau diselesaikan

Portofolio Anda sekarang berupa tiga PDF yang isinya sudah bagus, tetapi ada empat masalah praktis yang membuatnya kurang bekerja.

**Rekruter tidak membuka PDF.** Berkas lampiran sering tidak diklik sama sekali, dan yang dibaca pertama biasanya justru tautan; tautan Anda sekarang mengarah ke pengumpul tautan, bukan ke halaman yang bercerita.

**Tiga proyek Anda terlihat terpisah.** Di CV, dashboard Excel, aplikasi web, dan server berdiri sebagai tiga baris terpisah, padahal ketiganya satu alur: Anda olah data di Excel, membangun ulang alurnya jadi aplikasi, lalu menyalakan server untuk menjalankannya. Begitu dipisah, benang merahnya hilang.

**Kemampuan Anda yang paling mahal tidak terlihat.** Banyak orang bisa menulis kode, dan yang jarang adalah orang yang paham aturan Juknis sekaligus bisa memaksa aturan itu berlaku di sistem. Di PDF, kemampuan semacam ini tenggelam di antara daftar teknologi.

**Belum ada tempat untuk menunjukkan bukti.** Angka seperti 84 aturan bernomor dan 1.003 uji otomatis hanya bermakna kalau ada konteksnya, dan halaman ini bisa menampilkan konteks itu tanpa membuat pembaca tenggelam.

---

## 3. Siapa yang membaca

**Rekruter dan HR.** Mereka memindai, bukan membaca, dan biasanya memberi 20 sampai 30 detik sebelum memutuskan lanjut atau tutup; yang dicari hanya dua hal, orang ini cocok untuk posisi apa dan ada buktinya atau tidak.

**Atasan program atau calon klien.** Mereka sudah paham istilah Monev, SR, SSR, dan Global Fund, jadi yang mereka timbang adalah sebesar apa data yang pernah Anda tangani dan apakah angkanya bisa dipercaya.

**Kolega teknis.** Mereka mungkin akan membuka DevTools untuk memastikan ini benar dibangun atau hanya mockup yang difoto.

Ketiganya harus bisa mengambil sesuatu dalam 30 detik pertama, dan karena itu urutan halaman ditentukan oleh apa yang perlu dilihat lebih dulu, bukan oleh kronologi proyek.

---

## 4. Tujuan dan ukuran berhasil

| Tujuan                                         | Ukuran                                                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Pembaca paham Anda siapa dan apa yang dibangun | Dalam 30 detik, dari hero saja, tiga hal terbaca: peran, objek kerja, dan bukti angka                         |
| Tiga proyek terbaca sebagai satu alur          | Satu section khusus yang memetakan aturan Juknis ke wujudnya di sistem, bukan tiga kartu terpisah tanpa hubungan |
| Rekruter bisa lanjut ke dokumen resmi          | Tombol unduh CV dan tiga PDF portofolio bekerja dari halaman                                                  |
| Halaman tetap ringan                           | Nol permintaan ke domain luar. Muat awal di atas lipatan di bawah 600 KB dari berkas lokal                    |
| Tidak ada data klien yang bocor                | Audit manual dan `grep` bersih dari NIK, nama klien, nama lembaga SR/SSR, dan angka capaian per orang         |
| Bisa dibaca di ponsel                          | Lulus uji 390 px, 768 px, dan 1440 px tanpa scroll horizontal                                                 |

---

## 5. Ruang lingkup

**Masuk lingkup**

- Satu halaman dengan 8 section, navigasi lengket, dan penanda section aktif.
- Tiga kartu karya yang bisa dibuka jadi panel detail tanpa pindah halaman.
- Galeri tangkapan layar dengan lightbox, seluruh gambar tersimpan di folder `assets/` dan dimuat sesuai kebutuhan.
- Tombol unduh CV dan tiga PDF, plus `mailto:ariefmaulanaputra@gmail.com`.
- Tata letak responsif dan gaya cetak sederhana.

**Tidak masuk lingkup**

- Blog, catatan, atau halaman terpisah per proyek.
- Formulir kontak yang butuh backend. Pakai `mailto:` saja.
- CMS. Isi halaman ditulis langsung di HTML.
- Analitik, piksel, atau pelacakan apa pun.
- Mode gelap. Satu tema terang sudah cukup.
- Versi bahasa Inggris. Bisa ditambah nanti kalau perlu.
- Animasi berat, video latar, atau efek parallax.

Alasan di balik daftar kedua sederhana: setiap tambahan di situ menuntut sesuatu yang harus dirawat, entah basis data, layanan pihak ketiga, atau dua versi isi yang mesti diselaraskan setiap kali ada perubahan. Untuk halaman yang tugasnya meyakinkan orang dalam satu kali baca, biaya perawatan sebesar itu tidak sepadan.

---

## 6. Isi halaman

Delapan section, berurutan. Kolom terakhir menjelaskan apa yang harus terbaca setelah section itu selesai.

| #  | Section                    | Isi                                                                                    | Setelah section ini, pembaca harus paham                  |
| -- | -------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 01 | **Hero**                   | Nama, satu kalimat peran, tiga angka kunci, dua tombol                                 | Anda siapa dan bukti pertamanya apa                       |
| 02 | **Kenapa ini dikerjakan**  | Pembuka konkret dari berkas Excel, lalu tiga risiko yang muncul kalau definisi berubah | Ada masalah nyata yang Anda tangani, bukan proyek latihan |
| 03 | **Peran saya: penerjemah** | Tabel tiga kolom: aturan Juknis, wujudnya di sistem, apa yang menguncinya | Inilah nilai jual Anda yang sebenarnya                    |
| 04 | **Karya**                  | Tiga kartu: aplikasi web, server sendiri, dashboard Excel                              | Ada tiga hal yang benar-benar dibangun, bukan satu        |
| 05 | **Arsitektur**             | Satu diagram: peramban, Cloudflare Tunnel, server, PM2, Docker, basis data             | Data tidak keluar dari server                             |
| 06 | **Bukti**                  | Tiga kelompok angka (sistem web, server, Excel) dan galeri tangkapan layar             | Angka-angkanya bisa diperiksa                             |
| 07 | **Cara kerja**             | Bagaimana Anda memakai AI tanpa menyerahkan keputusan                                  | Anda yang memutuskan cara aturan dijalankan dan kriteria lulusnya |
| 08 | **Kontak**                 | Nama, kota, email, tombol unduh, catatan privasi                                       | Cara menghubungi Anda, dan bahwa halaman ini bersih       |

### 6.1 Draf copy untuk tiga section teratas

Ditulis dengan bahasa sehari-hari, sudut pandang orang pertama. Ini draf, bukan harga mati.

**Hero**

> # Dari satu berkas Excel ke sistem yang jalan sendiri
>
> Saya Arif. Sejak 2019 saya kerja di pemantauan program HIV. Aturan capaiannya datang dari Juknis Penjangkauan dan Rujukan PR Spiritia 2024, dan pekerjaan saya membuat aturan itu benar-benar jalan di sistem: membangun aplikasi webnya, lalu merawat server tempat aplikasi itu hidup.
>
> **84** aturan teknis bernomor · **1.003** uji otomatis · **1** server sendiri
>
> [Lihat karya] [Unduh CV]

**Section 02**

> Dulu satu berkas Excel menampung 379 ribu baris penjangkauan, 24 ribu rumus rekap, 39 pivot table, dan satu tombol `Refresh`. Semuanya benar, sampai definisinya berubah.
>
> Yang paling sering terjadi adalah angka yang terlihat benar padahal salah, bukan aplikasi yang rusak. Baris agregat ikut terjumlah dua kali. Nilai bulanan yang sebenarnya kumulatif dijumlahkan lagi, hasilnya bengkak sekitar 3,5 kali. Status tes yang sensitif terlanjur ditulis sebagai kata di layar yang bisa dilihat siapa saja.

**Section 03**

> Aturannya datang dalam bentuk kalimat Juknis, bukan tiket teknis. Contohnya "nilai semester itu ambil bulan terakhir, jangan dijumlah". Tugas saya mengubah kalimat semacam itu jadi perilaku mesin, lalu menulis uji supaya aturan tersebut tidak dilanggar diam-diam enam bulan kemudian.

Tabel di section ini memakai tiga pasang contoh yang sudah terverifikasi:

| Aturan Juknis                           | Wujudnya di sistem                                                                                                   | Yang mengunci                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Rekap per kab/kota dan per SSR          | Tabel pra-agregat, baris agregat tidak dicampur dengan baris per petugas, nilai semester diambil dari bulan terakhir | ADR-01 dan uji KPI                           |
| Slicer untuk memilih lembaga dan kota   | Cakupan SSR ditegakkan di server. Pengguna tidak bisa memilih wilayah di luar wewenangnya                            | RBAC dan uji isolasi SSR                     |
| Tombol `Refresh` untuk menghitung ulang | Hitung ulang otomatis, termasuk mengisi indikator baru ke periode yang sudah terkunci                                | `tulisUlangIndikatorSsr()` dan uji pemulihan |

---

## 7. Nada bahasa

Halaman ini dibaca orang, bukan mesin. Aturannya:

- Bahasa Indonesia sehari-hari. Kalau sebuah istilah hanya dipahami orang dalam, jelaskan sekali lalu pakai.
- Kalimat aktif dengan pelaku jelas. "Saya olah data" bukan "data diolah".
- Angka konkret mengalahkan kata sifat. "1.003 uji otomatis" bukan "sangat teliti".
- Panjang kalimat bervariasi. Kalimat pendek untuk menekan poin, kalimat panjang kalau memang perlu menjelaskan.
- Tanpa tanda pisah panjang. Tanpa emoji. Tanpa kata pengisi seperti "perlu diketahui bahwa".
- Tanpa pola kontras yang menyangkal hal yang tidak pernah dikatakan pembaca. Kalau ada yang mau ditegaskan, tulis langsung.
- Istilah teknis tetap apa adanya: Next.js, Docker, PM2, pivot table, RBAC. Jangan diterjemahkan paksa.
- Singkatan Monev, SR, SSR, dan PL dipakai, tetapi diberi penjelasan singkat di pemunculan pertama.

---

## 8. Kebutuhan fungsional

| Kode | Kebutuhan                                 | Kriteria lulus                                                                  |
| ---- | ----------------------------------------- | ------------------------------------------------------------------------------- |
| F-01 | Navigasi lengket berisi 5 tautan section  | Klik tautan meluncur ke section yang benar, section aktif ditandai              |
| F-02 | Kartu karya bisa dibuka jadi panel detail | Panel terbuka tanpa pindah halaman, tombol tutup bekerja, tombol Escape menutup |
| F-03 | Galeri tangkapan layar dengan lightbox    | Klik gambar memperbesar, panah kiri kanan berpindah, Escape menutup             |
| F-04 | Tombol unduh CV dan dua PDF               | Ketiga berkas terunduh atau terbuka dari `file://` tanpa galat                  |
| F-05 | Tombol email                              | Membuka klien surel dengan alamat terisi                                        |
| F-06 | Animasi muncul saat menggulir             | Nonaktif otomatis bila `prefers-reduced-motion` menyala                         |
| F-07 | Diagram arsitektur                        | Terbaca di 390 px tanpa perlu memperbesar                                       |
| F-08 | Tautan ke studi kasus Excel               | Membuka berkas studi kasus, bukan berkas `.xlsb`                                |

---

## 9. Kebutuhan non-fungsional

| Kode | Kebutuhan             | Kriteria lulus                                                                                           |
| ---- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| N-01 | Tanpa aset eksternal  | Nol permintaan ke domain luar. Font, ikon, dan gambar ikut di dalam folder                               |
| N-02 | Jalan tanpa server    | Semua fitur bekerja saat dibuka lewat `file://`                                                          |
| N-03 | Ringan                | Muat awal di atas lipatan di bawah 1,5 detik. Gambar galeri dimuat sesuai kebutuhan, bukan sekaligus           |
| N-04 | Responsif             | Lulus 390, 768, dan 1440 px tanpa scroll horizontal                                                      |
| N-05 | Aksesibel             | Kontras teks minimal 4,5:1, semua gambar punya teks alternatif, navigasi bisa dipakai dengan papan ketik |
| N-06 | Siap cetak            | Gaya cetak A4 tidak memotong kartu atau tabel                                                            |
| N-07 | Metadata              | Judul, deskripsi, dan kartu pratinjau terisi, tanpa pelacakan                                            |
| N-08 | Tahan di server kecil | Kalau nanti ditaruh di M710s, tidak menambah beban RAM berarti karena hanya berkas statis                |

---

## 10. Sumber setiap angka

Setiap angka yang tampil di halaman punya satu sumber yang bisa dibuka. Kalau sebuah angka tidak bisa ditelusuri ke baris di tabel ini, angka itu tidak dipajang.

| Angka di halaman | Nilai | Sumber |
|---|---:|---|
| Aturan teknis bernomor | 84 | `D:\Web Portal\WBDB\README.md`, butir 1 sampai 84 |
| Uji otomatis | 1.003 lulus, 6 dilewati | `npm run test` (vitest), 12 November 2026 |
| Sheet di berkas Excel | 57 | `01-studi-kasus-excel-makro.md` bagian 2 |
| Pivot table | 39 | 38 di sheet `Pivot` + 1 di `Weekly Chart` |
| Slicer cache | 4 | `Slicer_SSR`, `Slicer_Kota`, `Slicer_Lembaga_SR`, `Slicer_Nama_Kota` |
| Chart tersemat | 56 | studi kasus bagian 2 |
| Prosedur VBA | 3 | `Sort`, `clear`, `Refresh` |
| Baris penjangkauan | 379.503 | sheet `Penjangkauan` |
| Baris rujukan | 86.868 | sheet `Rujukan` |
| Kolom bantu | 136 | 72 di `Penjangkauan` + 64 di `Rujukan` |
| Rumus rekap | 24.578 | sheet `Rekap`, 70 × 399 |
| Tabel hasil di Portofolio 1 | 9 | bagian 06 sampai 14 |
| Kategori Gap Analysis | 11 | `lib/gap-analysis` |
| Kolom template target | 31 | `lib/target-format.ts`, 4 tipe klien aktif |
| Port masuk | 0 | Cloudflare Tunnel, tanpa port terbuka |
| Masa cookie akses NIK | 12 jam | `lib/kode-nik` |
| Halaman tiga portofolio | 18 / 19 / 9 | tiga berkas PDF |

Dua angka sengaja tidak dipajang karena berubah setiap rilis dan tidak menambah apa pun bagi pembaca: jumlah komit dan jumlah baris basis data.

Aturan praktis: angka yang bisa berubah (jumlah uji, jumlah halaman) diberi tanggal di komentar HTML. Angka struktural (jumlah sheet, pivot, kolom) tidak perlu tanggal karena hanya berubah kalau berkas Excel-nya berubah.

---

## 11. Bahan yang sudah ada

- `cv-arif-maulana-ade-putra-2026.pdf`, CV terbaru, 2 halaman.
- `01-portofolio-perhitungan-excel.pdf`, 18 halaman, 19 tangkapan layar.
- `02-portofolio-website-monitoring.pdf`, 19 halaman, 20 tangkapan layar.
- `03-portofolio-private-server-windows10.pdf`, 9 halaman, 3 tangkapan layar.
- `01-studi-kasus-excel-makro.md`, anatomi berkas Excel dan peta padanannya ke web.
- `design-landing-page-portofolio.md`, dokumen desain halaman ini.
- `_aset/excel/` berisi 21 tangkapan layar Excel dan `_aset/web2/` berisi 23 tangkapan layar sistem. Semuanya PNG terpisah dan sudah disaring dari data klien. Dua di antaranya versi tersunting yang wajib dipakai: `14-data-m.png` dan `18-audit-m.png`.
- `assets/font/` berisi Plus Jakarta Sans subset latin dalam format woff2, dibundel bersama lisensi OFL.
- Logo YPI di `D:\Web Portal\WBDB\public\`.
- Token warna di `DESIGN_SYSTEM_YPI.md`; aturan tampilan di `design-landing-page-portofolio.md`.

**Folder jadi:** `D:\Potofolio Arif\`. Berkas disalin ke sana, master tetap di `C:\Users\pf44x\Downloads\DBYPI\portofolio\`. Susunannya:

```
D:\Potofolio Arif\
  index.html
  assets\
    gaya.css
    font\     plus-jakarta-sans-latin.woff2, OFL-Plus-Jakarta-Sans.txt
    img\      44 tangkapan, versi 420 px dan 1400 px
  dokumen\    tiga PDF portofolio + CV
  prd-landing-page-portofolio.md
  design-landing-page-portofolio.md
```

Tautan di `index.html` memakai jalur relatif ke `dokumen\` dan `assets\`. Dengan begitu folder ini bisa dibuka dari `file://`, dipindah, atau diunggah tanpa mengubah satu pun `href`. Empat PDF dan dua font sudah ada di folder jadi per 13 November 2026; `index.html`, `gaya.css`, dan `img\` menyusul saat build.

Yang **tidak** ikut ke folder jadi: tiga HTML sumber (masing-masing 8 sampai 12 MB, gambarnya sudah tertanam base64), dua templat `_tpl-*`, berkas `.xlsb` 73 MB, arsip `.bukti/`, dan dua tangkapan asli yang belum tersunting (`14-data.png`, `18-audit.png`). Galeri wajib memakai versi tersunting `14-data-m.png` dan `18-audit-m.png`.

---

## 12. Kriteria penerimaan

Halaman dianggap selesai kalau semua baris ini tercentang. Semuanya bisa diperiksa tanpa alat khusus: lebar layar lewat DevTools, permintaan jaringan lewat tab Network, dan audit privasi lewat pencarian teks di dalam berkas.

- [ ] Delapan section ada, urutannya sesuai bagian 6.
- [ ] Hero memuat nama, satu kalimat peran, tiga angka, dan dua tombol.
- [ ] Section 03 memuat tabel tiga kolom dengan minimal tiga pasang contoh terverifikasi.
- [ ] Tiga kartu karya bisa dibuka dan ditutup, termasuk lewat Escape.
- [ ] Lightbox bekerja untuk 44 gambar di galeri, tab filter menghitung benar.
- [ ] Empat tombol unduh (CV dan tiga PDF) dan satu `mailto:` bekerja dari `file://`.
- [ ] Alamat `mailto:` dan berkas CV cocok dengan keputusan di bagian 15, dan `s.id/portoArif` tidak muncul di halaman.
- [ ] Nol permintaan jaringan ke domain luar, dibuktikan dari tab Network.
- [ ] Lulus 390, 768, dan 1440 px tanpa scroll horizontal.
- [ ] `prefers-reduced-motion` dihormati.
- [ ] Audit privasi bersih: tidak ada NIK, nama klien, nama lembaga SR/SSR, atau nomor HP.
- [ ] Setiap angka di halaman ada barisnya di bagian 10.
- [ ] Naskah lolos `metrik.py` dengan preset `semiformal`, nol em dash dan en dash.
- [ ] Daftar periksa tampilan di `design-landing-page-portofolio.md` bagian 12 tercentang semua.

---

## 13. Rencana kerja

| Tahap | Isi                                                                           | Keluaran                            |
| ----- | ----------------------------------------------------------------------------- | ----------------------------------- |
| 1     | Keputusan bagian 15 sudah dikunci. Siapkan `assets/` dari tangkapan layar dan logo | Folder aset                         |
| 2     | Bangun kerangka HTML, CSS, dan JS. Tanpa isi dulu                             | Halaman kosong yang sudah responsif |
| 3     | Isi delapan section dengan copy final                                         | Halaman lengkap                     |
| 4     | Uji di tiga lebar layar, uji lightbox, uji unduhan, audit privasi             | Daftar temuan                       |
| 5     | Perbaiki temuan, serahkan berkas dan pratinjau                                | Halaman siap                        |

Penayangan ke subdomain atau Cloudflare Tunnel saya kerjakan terpisah, hanya kalau Anda minta. Tahap 1 sampai 5 tidak menyentuh proyek `D:\Web Portal\WBDB`.

---

## 14. Risiko

| Risiko                                          | Kemungkinan | Cara menangani                                                                       |
| ----------------------------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| Angka di halaman tidak cocok dengan sumber      | Sedang      | Setiap angka dicatat asalnya di komentar HTML, diperiksa sekali lagi sebelum rilis   |
| Tangkapan layar tanpa sengaja memuat data klien | Rendah      | Audit manual tiap gambar, bukan hanya mengandalkan penyaringan otomatis              |
| Halaman membengkak karena 44 gambar             | Sedang      | Thumbnail 420 px di bawah 70 KB, gambar penuh hanya dimuat saat lightbox dibuka      |
| Klaim terdengar berlebihan                      | Sedang      | Hanya pakai angka terukur, tanpa kata seperti "terbaik" atau "revolusioner"          |
| Halaman usang setelah proyek berubah            | Tinggi      | Tanggal "terakhir diperbarui" ditulis di footer, angka diperiksa tiap kali ada rilis |

---

## 15. Keputusan

**Sudah dikunci**

| # | Keputusan     | Nilai                                             |
| - | ------------- | ------------------------------------------------- |
| 1 | Audiens utama | Rekruter dan HR                                   |
| 2 | Arah visual   | Editorial terang, navy, mengikuti token YPI       |
| 3 | Identitas     | Nama, kota, dan email. Tanpa foto, tanpa nomor HP |
| 4 | Penempatan    | Berkas lokal dulu, belum diunggah                 |
| 5 | Bahasa        | Indonesia sehari-hari                             |
| 6 | Bentuk        | Satu halaman statis, tanpa build step             |

Empat keputusan tampilan dikunci pada 13 November 2026 dan rinciannya pindah ke `design-landing-page-portofolio.md`:

| # | Keputusan | Nilai | Akibat |
| - | --------- | ----- | ------ |
| 7 | Bentuk berkas | Folder `index.html` + `assets/`, gambar PNG terpisah | Thumbnail 420 px dimuat sesuai kebutuhan, gambar 1400 px hanya saat lightbox dibuka. Tidak ada base64 |
| 8 | Tipografi | Plus Jakarta Sans untuk seluruh halaman, bobot dan ukuran membedakan judul, isi, serta angka | Satu berkas woff2 subset latin yang dibundel di `assets/font/` |
| 9 | Galeri bukti | Seluruh tangkapan layar: 21 Excel dan 23 sistem web | 44 butir, dua tab filter, `loading="lazy"` pada semua thumbnail |
| 10 | Publikasi | Berkas lokal dulu | Tidak ada unggahan, tidak ada perubahan pada server M710s |

**Dikunci 13 November 2026**

| # | Keputusan | Nilai | Akibat |
| - | --------- | ----- | ------ |
| 11 | Alamat email | `ariefmaulanaputra@gmail.com` | Satu alamat dipakai di hero, section 08, footer, dan `mailto:`. Sama dengan yang tercetak di CV. Nomor HP tetap tidak dipasang |
| 12 | Tautan pendek | Diganti domain pribadi. `s.id/portoArif` tidak dipakai sebagai alamat kanonik | Halaman tidak menautkan ke `s.id`. `canonical` dan `og:url` dibiarkan kosong sampai nama domain ada. CV perlu diperbarui sebelum dicetak ulang |
| 13 | Berkas CV | `dokumen/cv-arif-maulana-ade-putra-2026.pdf`, 2 halaman, 1 kolom ATS | Tombol unduh langsung memakai berkas yang sudah ada di folder jadi |

Tidak ada pertanyaan terbuka lagi. Dua pekerjaan turunan tetap tercatat di sini supaya tidak hilang saat build:

1. Nama domain pribadi diisi sebelum halaman ditayangkan. Ini nilai yang belum ada, bukan keputusan yang menggantung. Selama halaman masih berupa berkas lokal, tidak ada `href` atau metadata yang bergantung padanya.
2. CV yang sudah tercetak memuat `s.id/portoArif`. Saat domain ditentukan, perbarui CV lalu timpa salinannya di `dokumen/`.

---

## 16. Yang berubah dari konsep sebelumnya

Konsep di `00-konsep-landing-page.md` ditulis sebelum CV Anda saya baca, dan tiga hal berubah setelah CV masuk.

**Identitas tidak lagi placeholder.** Nama, kota, dan email sudah ada, jadi tidak perlu `[NAMA]` dan `[EMAIL]`.

**Ada tombol CV.** Sebelumnya portofolio hanya menautkan PDF studi kasus, sedangkan sekarang CV jadi salah satu tombol utama karena rekruter biasanya minta CV lebih dulu sebelum membaca studi kasus.

**Riwayat kerja masuk cerita.** Tujuh tahun di dua lembaga, dengan peran yang naik dari pelaksana di tingkat bawah SR ke posisi senior di SR, itu bukti tersendiri yang sebelumnya tidak muncul di konsep.

Sisanya tetap: delapan section, editorial terang, dan berkas lokal dulu.
