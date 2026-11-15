# Studi Kasus: Anatomi Excel Makro dan Padanannya di Sistem Web

**Berkas Sumber:** `Dashboard Capaian YPI.xlsb` (arsip internal)  
**Ukuran Berkas:** 73.348.301 byte (73,3 MB)  
**Hash SHA-256:** `731b89a17e7045aa123424bfec60436da13953b2aec78e0ae6ae34a6f6e5eeba`  
**Metode Audit:** ZIP/OLE biner + Excel COM mode baca saja (read-only), makro dinonaktifkan, data klien diproteksi penuh.  
**Tanggal Verifikasi:** 12 November 2026  
**Penyusun:** Arif Maulana Ade Putra  
**Rujukan Acuan:** Petunjuk Teknis (Juknis) Penjangkauan dan Rujukan PR Spiritia 2024  

> **Pemberitahuan Privasi Data:** Berkas sumber memuat transaksi riil program kesehatan. Data perorangan (seperti NIK, nama klien, nomor kontak, maupun capaian per orang) tidak disematkan, tidak diunggah, dan tidak dipublikasikan ke ranah publik. Dokumen studi kasus ini murni menyajikan **fakta struktur, volume data, relasi logika, dan metodologi rekayasa sistem**.

---

## 1. Mengapa Berkas Ini Menjadi Fondasi Portofolio

Sistem pemantauan web yang saya bangun bukan proyek contoh atau aplikasi yang lahir dari asumsi teoretis. Berkas Excel makro ini membuktikan bahwa aplikasi web tersebut merupakan **translasi langsung dari mesin perhitungan operasional yang dirancang dan dijalankan di lapangan** pada tingkat Implementing Partner (SR).

Saya merancang buku kerja ini dari pengalaman bertahun-tahun mengelola alur data lapangan. Ketika kebutuhan pemantauan berkembang untuk mengawal implementasi *Theory of Change* program, saya menyusun aturan bisnis, struktur kaskade indikator, dan skenario validasi berdasarkan Petunjuk Teknis PR Spiritia. Saya memanfaatkan AI hanya sebagai alat bantu saat menulis kode Next.js, menyusun tipe data TypeScript, dan menyiapkan 1.003 pengujian otomatis, sedangkan penguasaan alur data dan integritas perhitungan tetap berada di bawah kendali saya.

Alur kalkulasi di lembar kerja Excel berjalan bertahap:

1. **Data mentah lapangan** (penjangkauan dan rujukan) diinput oleh tim.
2. **136 kolom bantu berumus** memvalidasi keunikan individu dan kelayakan layanan.
3. **Rekapitulasi berjenjang** mengelompokkan data per kabupaten/kota dan per SSR.
4. **39 pivot table dan 4 slicer** menyaring tampilan berdasarkan wilayah kerja.
5. **Dashboard eksekutif dan 56 grafik** menyajikan ringkasan visual untuk pengambil keputusan.

Alur di Excel tersebut dipetakan satu per satu ke arsitektur sistem web: tabel transaksi masuk ke basis data relasional PostgreSQL, logika agregasi dipindahkan ke mesin kalkulasi KPI teruji (ADR-01), dan pemilihan slicer diubah menjadi penegakan wewenang akses berbasis peran (RBAC). 

Yang berevolusi bukan logikanya, melainkan **penjaga kebenarannya**: rumus sel yang rentan tersenggol dan tombol makro manual kini digantikan oleh aturan bernomor yang dikawal ketat oleh 1.003 uji otomatis.

> **Sumber Aturan Resmi & Pemodelan Theory of Change:** Seluruh definisi indikator mengacu pada **Petunjuk Teknis (Juknis) Penjangkauan dan Rujukan PR Spiritia 2024** serta kerangka kerja *Theory of Change* penanggulangan HIV. Tugas saya sebagai pengembang dan staf monev adalah menerjemahkan kebutuhan monev tersebut menjadi algoritma komputasi yang konsisten, tanpa deviasi walau data lapangan memiliki banyak variasi penulisan.

---

## 2. Anatomi Berkas Excel Makro (Hasil Audit Struktur)

Pemeriksaan struktur biner terhadap 640 komponen di dalam berkas `.xlsb` menunjukkan pembagian empat lapisan kerja:

### 2.1 Ringkasan Komponen Biner

| Komponen Biner | Jumlah | Peran dan Penjelasan |
|---|---:|---|
| Lembar Kerja (Worksheet) | **57** | Lembar transaksi mentah, referensi wilayah, kalkulasi antara, rekapitulasi, dan visualisasi. |
| Tabel Pivot (Pivot Table) | **39** | 38 tabel pivot di lembar `Pivot` untuk rekapitulasi capaian, 1 tabel pivot di lembar `Weekly Chart`. |
| Cache Pivot (Pivot Cache) | **2** | Cache 1 merujuk ke named range `pivot`; Cache 2 merujuk ke lembar grafik mingguan. |
| Cache Slicer | **4** | `Slicer_SSR`, `Slicer_Kota`, `Slicer_Lembaga_SR`, `Slicer_Nama_Kota`. |
| Slicer Visual | 2 | Slicer bergaya gelap untuk memfilter lembaga SR dan nama kabupaten/kota. |
| Grafik Tersemat (Chart) | **56** | Visualisasi tren bulanan, perbandingan capaian antar-SSR, dan distribusi layanan. |
| Named Range | 54 | Termasuk range dinamis `pivot` untuk sumber data rekapitulasi. |
| Koneksi Data Model | 1 | Koneksi internal Data Model menuju range rekapitulasi `Rekap!$B$5:$F$71`. |
| Proyek VBA (`vbaProject.bin`) | 1 | Berukuran 136 KB, memuat 3 modul untuk otomasi alur kerja. |

### 2.2 Lapisan 1: Data Mentah dan 136 Kolom Bantu

Dua lembar kerja penampung data utama menggunakan tata letak terpisah: kolom formulir input di sisi kiri, satu kolom kosong sebagai pemisah, diikuti deretan panjang kolom bantu yang seluruhnya berisi formula:

| Nama Lembar | Baris Data | Total Kolom | Kolom Input | Kolom Bantu Berumus | Baris Formula |
|---|---:|---:|---:|---:|---:|
| `Penjangkauan` | **379.503** | 101 | 28 | **72** | Mulai baris 11 s.d. 379.503 |
| `Rujukan` | **86.868** | 92 | 27 | **64** | Mulai baris 8 s.d. 86.868 |
| **Total Kolom Bantu** | | | | **136** | |

136 kolom bantu berumus ini bertugas menjawab pertanyaan validasi yang diwajibkan oleh Juknis sebelum data dapat direkapitulasi:

1. **Kunci Unik Klien:** Menggabungkan kode lembaga, nomor UIC, dan tanggal interaksi agar satu klien tidak terhitung ganda.
2. **Pemisah Jalur Kontak:** Memisahkan interaksi tatap muka (TM) dari interaksi virtual (VO) sehingga tidak ada klaim ganda atas orang yang sama.
3. **Penanda Kontak Pertama:** Mengunci ketentuan juknis bahwa dalam satu periode pelaporan, capaian penjangkauan hanya dihitung dari kontak pertama.
4. **Logistik dan Pencegahan:** Menghitung jumlah kumulatif materi KIE, kondom, pelicin, dan jarum suntik steril per klien unik, bukan per kunjungan.
5. **Rujukan Layanan:** Memastikan rujukan ke tes HIV (VCT), pengobatan ARV, profilaksis pra-paparan (PrEP), dan skrining TB tercatat secara sah.
6. **Skrining Kekerasan:** Menstandardisasi jawaban terbuka petugas lapangan menjadi tiga kategori pasti: kekerasan HAM, kekerasan berbasis gender (KBG), atau tidak ada kekerasan.
7. **Periode Otomatis:** Menurunkan nilai bulan dan minggu pelaporan secara presisi dari tanggal kegiatan.

> **Tantangan Nyata di Lembar Kerja Excel:** 136 kolom bantu ini menyimpan asumsi langsung di dalam formula sel (misalnya formula bersyarat `=1`). Ketika petugas lapangan mengosongkan status tertentu, rumus menghasilkan nilai nol semu. Hal ini yang melatarbelakangi kebutuhan memindahkan seluruh mesin hitung ke sistem web berbasis kode yang dapat diuji secara otomatis.

### 2.3 Lapisan 2: Rekapitulasi Berjenjang (24.578 Rumus)

Lembar `Rekap` berdimensi 70 baris × 399 kolom menampung **24.578 rumus kalkulasi**. Rekapitulasi membagi capaian ke tingkat pelaksana (SSR) dan wilayah kerja kabupaten/kota:

| Lembar Rekapitulasi | Dimensi Sel | Jumlah Rumus |
|---|---|---:|
| `Rekap` | 70 × 399 | 24.578 |
| `Capaian PL-KL` | 974 × 89 | 71.202 |
| `Rujukan By Layanan` | 705 × 64 | 42.726 |
| `GAP` (Analisis Kesenjangan) | 92 × 387 | 24.219 |
| `Kontak - Tes - Logistik` | 94 × 196 | 15.889 |
| `Umur-SHM` dan `Umur-NON SHM` | 95 × 184 / 123 | 25.196 |
| `Monthly Outreach` dan `Monthly Test` | 95 × 218 | 35.870 |
| `Weekly Progress` | 94 × 171 | 14.328 |
| `Harian SSR` dan `Harian PL` | 90 × 75 / 78 | 10.796 |

### 2.4 Lapisan 3 dan 4: Pivot Table, Slicer, dan Prosedur VBA

39 pivot table di lembar `Pivot` tidak langsung membaca 379 ribu baris data mentah secara mentah-mentah (karena akan membuat Excel membeku), melainkan membaca range yang sudah diringkas oleh lembar rekapitulasi. 

Tiga prosedur makro VBA bertindak sebagai operator otomatisasi:

- `Sort`: Menata urutan data wilayah dan petugas secara konsisten menurut abjad dan hierarki.
- `clear`: Membersihkan area memori sementara sebelum proses kalkulasi ulang dimulai.
- `Refresh`: Menyegarkan seluruh pivot cache dan data model secara berurutan setelah rumus rekapitulasi selesai dihitung.

Makro VBA berfungsi murni sebagai **penggerak alur kerja**, sedangkan logika bisnis sepenuhnya bertumpu pada formula sel.

---

## 3. Peta Padanan Komprehensif: Excel Makro ke Sistem Web

Tabel di bawah ini merinci bagaimana setiap instrumen yang sebelumnya berada di lembar kerja Excel diterjemahkan menjadi arsitektur web modern yang tangguh:

| Fungsi Kerja | Bentuk di Excel Makro | Implementasi di Sistem Web (`WBDB`) |
|---|---|---|
| **Penyimpanan Transaksi** | Lembar `Penjangkauan` dan `Rujukan` | Tabel relasional PostgreSQL lokal (Docker) dengan indeks teroptimasi |
| **Kalkulasi Tiap Baris** | Lembar `S1 Penjangkauan` (~300 ribu baris formula) | Modul pemrosesan data dan KPI Engine TypeScript (`lib/kpi/engine.ts`) |
| **Agregasi Wilayah** | Lembar `Rekap` (24.578 rumus, 399 kolom) | Tabel pra-agregat `kpi_summaries` dan `kpi_harian` (standar ADR-01) |
| **Filter dan Isolasi Data** | 4 Slicer interaktif (Slicer_SSR, Slicer_Kota) | Role-Based Access Control (RBAC) ditegakkan langsung di level kueri server |
| **Antarmuka Visual** | 39 Pivot Table dan 56 Grafik Excel | 10 Menu Dashboard Next.js interaktif dengan grafik ECharts responsif |
| **Penyegaran Kalkulasi** | Tombol makro VBA `Refresh()` | Pemrosesan latar belakang dan fungsi pemulihan `tulisUlangIndikatorSsr()` |
| **Target Kinerja** | Lembar `Target` dan `Target Indikator` | Parser target dinamis untuk 4 tipe klien aktif (`lib/target-format.ts`) |
| **Analisis Kesenjangan** | Lembar `GAP` (387 kolom matriks) | Modul Gap Analysis 11 kategori indikator kaskade program |
| **Keamanan Informasi** | Terbuka tanpa enkripsi bagi siapa pun pemegang file | Enkripsi cookie HMAC 12 jam, penyamaran identitas, dan nol port terbuka |

### Tiga Keunggulan Nilai yang Terbukti di Sistem Web:

1. **Logika Agregasi Tidak Lagi Rentan Rusak (Standar ADR-01):**  
   Di Excel, penambahan baris rekap berisiko menjumlahkan baris agregat dua kali. Di sistem web, arsitektur ADR-01 mengunci bahwa baris total (`petugas_id IS NULL`) dipisahkan secara ketat dari data perorangan petugas. Selain itu, capaian semester wajib mengambil angka bulan penutupan (bulan ke-6 atau ke-12), bukan akumulasi fungsi `SUM()` bulanan yang bisa membengkakkan laporan hingga 3,5 kali lipat.

2. **Filter Tampilan Berevolusi Menjadi Hak Akses Server:**  
   Di Excel, slicer hanyalah preferensi tampilan yang bisa diubah oleh siapa saja yang membuka file. Di sistem web, pembatasan wilayah SSR ditegakkan secara absolut di tingkat basis data. Pengguna dari SSR tertentu secara teknis tidak dapat mengintip data dari wilayah kerja lain.

3. **Penanganan Indikator Baru Tanpa Merusak Data Historis:**  
   Menambahkan indikator baru pada lembar kerja Excel berisiko merusak rumus periode sebelumnya. Di sistem web, fungsi pemulihan `tulisUlangIndikatorSsr()` menjamin indikator baru dapat dihitung secara retroaktif tanpa membatalkan status audit dari periode yang sudah dikunci.

---

## 4. Tiga Dokumen Portofolio Pendukung

Struktur teknis ini didokumentasikan ke dalam tiga berkas portofolio resmi:

1. **`01-portofolio-perhitungan-excel.pdf` (18 Halaman):**  
   Mendokumentasikan alur data mentah, 136 kolom bantu, 8 aturan pemrosesan data, 9 tabel hasil kalkulasi, hingga pivot table dan dashboard eksekutif.

2. **`02-portofolio-website-monitoring.pdf` (19 Halaman):**  
   Menampilkan implementasi aturan juknis ke dalam sistem monitoring web, dilengkapi 20 tangkapan layar antarmuka pengguna, navigasi 10 menu, dan modul analisis kesenjangan.

3. **`03-portofolio-private-server-windows10.pdf` (9 Halaman):**  
   Menguraikan arsitektur server mandiri di fasilitas lokal: spesifikasi perangkat keras M710s, manajemen proses PM2, kontainer Docker PostgreSQL, konfigurasi Cloudflare Tunnel tanpa port terbuka, dan protokol pencadangan data berkala.

---

## 5. Kesimpulan dan Batasan Privasi

Studi kasus ini menegaskan bahwa nilai utama rekayasa sistem ini terletak pada keahlian pemantauan program: **memahami rantai intervensi Theory of Change, menaati Petunjuk Teknis PR Spiritia, dan menguasai struktur data lapangan yang rumit**. Pemanfaatan AI berperan sebagai alat bantu penulisan kode pada tahap pengembangan web, sedangkan arsitektur data, logika agregasi, dan validitas perhitungan dikendalikan penuh oleh keahlian manusia.

### Batasan Privasi dan Kepatuhan Etika Data:
- Berkas biner `.xlsb` asli disimpan di media penyimpanan privat yang terisolasi dan tidak diunggah ke repositori publik.
- Seluruh identitas individu (nama klien, nomor induk kependudukan, nomor rekam medis, dan alamat) telah disanitasi penuh.
- Visualisasi publik hanya menampilkan indikator agregat dan persentase capaian tanpa mengekspos rekam kesehatan perorangan.

---

## 6. Metode Verifikasi Struktur

Bagi pihak berkepentingan yang ingin menguji validitas fakta struktur ini, verifikasi dapat dijalankan melalui skrip audit berkas:

```bash
# Memeriksa jumlah komponen arsip biner (.xlsb)
python -c "import zipfile; z=zipfile.ZipFile('Dashboard Capaian YPI.xlsb'); print(len(z.namelist()))"

# Membaca struktur modul VBA tanpa menjalankan makro
python probe_vba_structure.py "Dashboard Capaian YPI.xlsb"

# Verifikasi melalui automasi COM Excel mode baca saja
# Workbooks.Open(path, ReadOnly=True), AutomationSecurity = 3
```

**Status Verifikasi:** Selesai dan terverifikasi penuh (12 November 2026). Seluruh fakta struktur telah diselaraskan dengan landing page portofolio dan dokumen pendukung.
