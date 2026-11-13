# DESAIN: Landing Page Portofolio

**Versi:** 1.1
**Tanggal:** 13 November 2026
**Pemilik:** Arif Maulana Ade Putra
**Pasangan:** `prd-landing-page-portofolio.md` (v1.2). Untuk isi, keputusan, dan urutan section, PRD yang menang. Untuk tampilan, dokumen ini yang menang.
**Status:** mengikat untuk pembangunan halaman. Situs belum dibangun.

> **Perubahan 1.0 ke 1.1.** Bagian 5.11 mencantumkan alamat email final dan melarang tautan pendek, mengikuti tiga keputusan yang dikunci di PRD bagian 15.

---

## 0. Hubungan dengan dokumen desain yang sudah ada

`DESIGN_SYSTEM_YPI.md` mengikat untuk **aplikasi** monitoring: sidebar 212 px, isi tabel 12 px, topbar 48 px, tombol 30 px, kartu KPI 21 px. Itu tepat untuk staf monev yang memindai angka di layar kerja sepanjang hari.

Halaman ini dibaca orang yang tidak bekerja di dalamnya. Rekruter membuka, memindai 30 detik, lalu memutuskan. Isi tabel 12 px dan topbar 48 px akan membuat halaman ini terlihat seperti panel admin yang tidak sengaja dibuka, bukan seperti portofolio orang.

Karena itu dokumen ini **tidak menyalin** `DESIGN_SYSTEM_YPI.md`. Yang diwarisi hanya empat hal:

| Diwarisi | Nilai |
|---|---|
| Palet navy | `#0f2a4a` · `#1d4e89` · `#2f6fb5` · `#eef3f8` |
| Garis tipis | 1 px `#dde5ec`, tanpa bayangan |
| Larangan | gradien, bayangan tebal, sudut di atas 12 px |
| Angka | `font-variant-numeric: tabular-nums`, rata kanan di tabel |

Sisanya diputuskan di sini, karena tugasnya berbeda: **membaca**, bukan **memindai**.

---

## 1. Prinsip

**Satu kolom untuk membaca, banyak kolom untuk membuktikan.** Semua prosa dibatasi 68 karakter per baris. Tabel, diagram, dan galeri boleh selebar halaman. Dua ukuran ini tidak pernah dicampur dalam satu blok.

**Angka lebih dulu, kalimat sesudahnya.** Setiap klaim diikuti angka yang bisa diperiksa. Kalimat tanpa angka hanya dipakai untuk menyambung, bukan untuk meyakinkan.

**Kontras dari bobot dan ukuran, bukan warna.** Halaman ini hanya punya navy, tinta, dan abu. Merah, kuning, hijau dipakai kalau memang sedang membicarakan gap, tidak untuk hiasan.

**Ruang kosong adalah bagian dari argumen.** Jarak antar-section 96 px. Section yang dipadatkan akan terbaca sebagai brosur.

**Tidak ada yang bergerak kecuali sekali, saat masuk layar.** Satu pola animasi untuk seluruh halaman. Tidak ada parallax, tidak ada video latar, tidak ada angka yang menghitung naik.

---

## 2. Token

Ditulis sebagai custom property di `assets/gaya.css`. Tidak ada nilai heksadesimal di luar blok ini, kecuali di dalam SVG diagram yang butuh warna garis.

Dua berkas font sudah tersedia di `_aset/font/` dan disalin ke `assets/font/` saat halaman dibangun. Nama berkasnya sengaja tetap, karena `@font-face` di bawah merujuk ke sana.

```css
@font-face{
  font-family:"Plus Jakarta Sans";
  src:url("font/plus-jakarta-sans-latin.woff2") format("woff2");
  font-weight:400 700; font-style:normal; font-display:swap;
}

:root{
  /* warna, peran bukan nama */
  --navy-900:#0f2a4a;   /* judul, teks tebal, latar panel gelap */
  --navy-700:#1d4e89;   /* tombol utama, tautan, aksen */
  --navy-600:#2f6fb5;   /* fokus, hover aksen, garis diagram aktif */
  --navy-100:#eef3f8;   /* latar label, kepala tabel */
  --page:#f5f7fa;       /* latar halaman */
  --surface:#ffffff;    /* kartu, panel, section terang */
  --line:#dde5ec;       /* garis pemisah tipis */
  --line-strong:#cfd9e3;/* garis kepala tabel, garis input */
  --ink:#1f2d3a;        /* teks isi */
  --muted:#5c6b7a;      /* keterangan, label sekunder */
  --faint:#8896a4;      /* HANYA ikon dan placeholder, tidak untuk teks */

  /* tiga warna makna, hanya untuk gap */
  --ok:#1e8449; --ok-bg:#eaf6ef;
  --warn:#b7791f; --warn-bg:#fdf6e7;
  --bad:#c0392b; --bad-bg:#fdeeec;

  /* ruang, kelipatan 4 */
  --s1:4px; --s2:8px; --s3:12px; --s4:16px;
  --s5:24px; --s6:32px; --s7:48px; --s8:64px;
  --s9:96px; --s10:128px;

  /* bentuk */
  --r-sm:6px; --r-md:10px; --r-pill:999px;
  --garis:1px solid var(--line);
  --garis-kuat:1px solid var(--line-strong);

  /* ukuran */
  --w-prosa:34em;      /* ± 68 karakter pada 16,5 px */
  --w-halaman:1120px;
  --w-lebar:1280px;

  /* lapis */
  --z-nav:100; --z-panel:200; --z-lightbox:300;
}
```

**Catatan `--muted`.** Nilai di `DESIGN_SYSTEM_YPI.md` adalah `#6b7c8c`, yang pada latar `#f5f7fa` hanya mencapai kontras 4,0:1. Di aplikasi itu dipakai untuk label 10,5 px di dalam tabel, dan di sana batasnya memang longgar. Di halaman ini `--muted` dipakai untuk keterangan yang harus terbaca, jadi nilainya digelapkan ke `#5c6b7a` agar melewati 4,5:1. `--faint` tidak pernah dipakai untuk teks.

---

## 3. Tipografi

Seluruh halaman memakai **Plus Jakarta Sans** dalam satu keluarga sans, dari judul sampai tabel. Bobot dan ukuran membedakan hierarki tanpa mengganti suara visual. Bentuk hurufnya tegas dan geometris, cocok dengan arah editorial terang yang sudah dipilih.

Semua angka memakai `font-variant-numeric: tabular-nums`, sehingga lebarnya konsisten di kartu dan tabel.

| Peran | Ukuran desktop | Ukuran 390 px | Bobot | Keluarga | Warna |
|---|---|---|---|---|---|
| Judul hero | 56 / 1,04 | 34 / 1,10 | 600 | serif | `--navy-900` |
| Judul section (h2) | 34 / 1,15 | 26 / 1,20 | 600 | serif | `--navy-900` |
| Sub-judul (h3) | 20 / 1,30 | 18 / 1,35 | 600 | serif | `--navy-900` |
| Paragraf pembuka | 20 / 1,55 | 18 / 1,55 | 400 | sans | `--ink` |
| Isi | 16,5 / 1,65 | 16 / 1,65 | 400 | sans | `--ink` |
| Keterangan gambar | 13,5 / 1,50 | 13,5 / 1,50 | 400 | sans | `--muted` |
| Label (huruf besar) | 11,5 / 1,30 · 0,08em | sama | 600 | sans | `--muted` |
| Angka statistik | 48 / 1,00 | 36 / 1,00 | 600 | sans, `tnum` | `--navy-900` |
| Kode sebaris | 14 / 1,45 | 13,5 / 1,45 | 400 | Plus Jakarta Sans | `--navy-900` |

Aturan tambahan:

- Jarak antar-paragraf `0,85em`. Tanpa indentasi baris pertama.
- `letter-spacing: -0,02em` hanya untuk judul hero, `-0,01em` untuk h2.
- `text-wrap: balance` untuk h1 dan h2, `text-wrap: pretty` untuk paragraf. Tanpa itu, baris terakhir judul sering menyisakan satu kata.
- `hyphens: manual`. Pemenggalan otomatis bahasa Indonesia di Chrome masih kasar dan menghasilkan potongan yang salah.
- `<strong>` hanya menaikkan bobot ke 600, tanpa mengubah warna. `<em>` hanya untuk istilah asing, bukan untuk penekanan.
- Kode sebaris memakai latar `--navy-100`, radius 4 px, padding `1px 5px`, tanpa garis.

---

## 4. Grid dan tata letak

**Titik henti:** 390 (dasar) · 640 · 900 · 1120 · 1440.

**Wadah:** `max-width:1120px`, `padding-inline:20px` di bawah 640 px dan `24px` di atasnya. Galeri dan diagram memakai wadah lebar `1280px`.

**Kolom:** 12 kolom, gutter 24 px, hanya dipakai untuk menyusun blok di dalam section. Prosa tidak pernah melebar melewati 6 kolom, karena 6 kolom pada 1120 px sudah ± 68 karakter.

**Ritme vertikal:**

| Jarak | Nilai |
|---|---|
| Atas-bawah section | 96 px desktop · 56 px ponsel |
| Judul section ke paragraf pertama | 20 px |
| Paragraf ke paragraf | 0,85em |
| Paragraf ke blok berikutnya (tabel, gambar) | 32 px |
| Antar-kartu | 24 px |

**Latar.** Seluruh halaman memakai `--page`. Hanya dua section berlatar `--surface` penuh dengan garis atas dan bawah: section 03 (tabel aturan) dan section 06 (bukti). Dua pergantian latar saja. Kalau setiap section berganti latar, halaman terbaca seperti zebra dan mata kehilangan penanda.

**Tinggi section.** Minimal 60vh, maksimal 100vh. Hero 78vh dengan batas atas 820 px, supaya di layar 1440 px tidak menyisakan ruang kosong setengah layar.

---

## 5. Komponen

### 5.1 Navigasi lengket

Tinggi 64 px. Latar `rgba(245,247,250,0.92)` dengan `backdrop-filter: blur(8px)`. Tanpa garis saat di puncak; garis bawah 1 px `--line` muncul setelah menggulir 24 px.

Isi: nama di kiri (16 px, 600, sans), lima tautan section di kanan (15 px, `--muted`), satu tombol "Unduh CV" (sekunder). Tautan aktif ditandai garis 2 px `--navy-700` di bawah label, bukan warna berbeda.

Di bawah 900 px: tautan pindah ke panel penuh yang dibuka tombol menu. Panel memakai `role="dialog"`, fokus terkunci, Escape menutup.

### 5.2 Hero

Grid 12 kolom. Judul menempati 7 kolom, strip angka 5 kolom di kanan pada 900 px ke atas; di bawah itu strip angka turun ke bawah judul.

Isi: label kecil di atas judul ("Portofolio, 2026"), judul 56 px, satu paragraf 20 px maksimal 3 baris, strip angka, dua tombol.

Tinggi minimum 78vh. Tanpa gambar latar, tanpa ilustrasi. Ruang kosong di kanan bawah adalah bagian dari komposisi.

### 5.3 Strip angka

Tiga angka berdampingan, dipisah garis vertikal 1 px `--line`. Tiap sel: label 11,5 px huruf besar, angka 48 px `tabular-nums`, keterangan 14 px `--muted`.

Di 390 px: tiga sel bertumpuk, garis pemisah jadi horizontal.

Angka wajib memakai pemisah ribuan titik (`1.003`, bukan `1,003`).

### 5.4 Kartu karya

Tiga kartu, grid 3 kolom pada 900 px ke atas, 1 kolom di bawahnya. Tinggi seragam lewat `align-items:stretch` dan isi yang memakai `flex-direction:column` dengan `margin-top:auto` pada tombol.

Isi tiap kartu: label jenis (11,5 px huruf besar), judul 20 px serif, satu kalimat 15 px, tiga angka kecil, tombol "Buka" bergaya tautan.

Garis 1 px `--line`, radius 10 px, latar `--surface`. Tanpa bayangan. Hover hanya mengubah warna garis jadi `--line-strong` dan menggeser 1 px.

### 5.5 Panel detail karya

Dialog `role="dialog" aria-modal="true"`, lebar 720 px, latar `--surface`. Muncul dari kanan di desktop (240 ms, `translateX`), dari bawah di ponsel. Latar belakang `rgba(15,42,74,0.55)`.

Isi: judul, dua paragraf, daftar lima butir, satu baris tautan ke PDF terkait. Tombol tutup di kanan atas, 44 px, ikon garis.

Escape menutup, klik latar menutup, fokus kembali ke tombol pembuka setelah ditutup.

### 5.6 Tabel aturan

Tiga kolom: **Aturan Juknis · Wujudnya di sistem · Yang mengunci**. Lebar 100%.

Kepala tabel: latar `--navy-100`, label 11,5 px huruf besar, `--muted`, garis bawah `--line-strong`, padding `8px 14px`.
Sel: 14,5 px / 1,5, padding `10px 14px`, baris selang-seling `--page`.
Kolom ketiga memakai kode sebaris 13 px.

**Varian daftar.** Section 02 dan 07 memakai susunan yang sama tanpa kepala tabel: label 11,5 px huruf besar di atas, satu kalimat 15 px di bawahnya, garis pemisah 1 px antar-butir, jarak 20 px. Dipakai untuk tiga risiko dan lima butir disiplin, supaya keduanya tidak terbaca sebagai tabel yang kehilangan kolom.

Di bawah 900 px tabel **tidak** digulir horizontal. Tiap baris berubah jadi blok bertumpuk: label kolom 11 px huruf besar di atas, nilai 14,5 px di bawahnya, garis pemisah antar-blok.

### 5.7 Diagram arsitektur

SVG sebaris, `viewBox="0 0 680 380"`, `width:100%`, `height:auto`. Lima simpul: peramban, Cloudflare Tunnel, Windows 10 / M710s, PM2 + Next.js, Docker + PostgreSQL. Panah 1 px dengan penanda segitiga.

Garis `--line-strong`, simpul berlatar `--surface` dengan garis 1 px, label 12 px Plus Jakarta Sans. Satu simpul (server) memakai latar `--navy-900` dengan teks putih untuk menandai batas kepemilikan.

Tidak ada teks di bawah 11 px di dalam SVG. Di 390 px diagram tetap terbaca tanpa diperbesar karena lebar label sudah dihitung untuk 680 satuan viewBox.

### 5.8 Galeri bukti

Grid: 3 kolom pada 900 px ke atas, 2 kolom 640 sampai 899 px, 1 kolom di bawah 640 px. Jarak 16 px.

Tiap butir: gambar rasio 16:10 dengan `object-fit:cover`, radius 6 px, garis 1 px; keterangan 13,5 px di bawahnya, maksimal dua baris.

Di atas grid: dua tab filter ("Excel 21" · "Sistem web 23") dan satu tombol "Semua 44". Tab aktif ditandai garis bawah 2 px. Hitungan diumumkan lewat `aria-live="polite"`.

Thumbnail memakai lebar 420 px, `loading="lazy"`, `decoding="async"`. Gambar penuh 1400 px hanya dimuat saat lightbox dibuka.

### 5.9 Lightbox

Latar `rgba(15,42,74,0.94)`. Gambar maksimal `92vw` × `86vh`, `object-fit:contain`. Keterangan di bawah gambar, 14 px, warna putih 80%.

Panah kiri dan kanan 48 px di tepi, Escape menutup, klik latar menutup, tombol panah papan ketik berpindah. Fokus terkunci di dalam dialog. Tanpa zoom, tanpa geser, tanpa putar.

### 5.10 Tombol

| Jenis | Spesifikasi |
|---|---|
| Utama | `--navy-700`, teks putih, tinggi 44 px, radius 8 px, padding `0 20px`, 15 px/600. Hover `--navy-900` |
| Sekunder | `--surface`, garis `--line-strong`, teks `--navy-900`. Hover latar `--navy-100` |
| Tautan | Teks `--navy-700`, garis bawah 1 px dengan `text-underline-offset:3px` |

Tinggi 44 px bukan 30 px seperti di aplikasi, karena di sini tombol disentuh jari, bukan hanya diklik kursor.

### 5.11 Footer

Tiga kolom: identitas (nama, kota, `ariefmaulanaputra@gmail.com`), tautan dokumen (CV, tiga PDF, studi kasus), catatan ("Halaman ini tidak memuat data klien" dan tanggal terakhir diperbarui). Nomor HP dan tautan `s.id/portoArif` tidak ditampilkan di footer maupun di bagian lain halaman.

Latar `--surface`, garis atas 1 px, padding `48px 0`. Di 390 px tiga kolom bertumpuk.

---

## 6. Gerak

Satu pola untuk seluruh halaman:

```css
.muncul{opacity:0; transform:translateY(12px); transition:opacity .24s cubic-bezier(.2,.7,.3,1), transform .24s cubic-bezier(.2,.7,.3,1)}
.muncul.tampak{opacity:1; transform:none}
@media (prefers-reduced-motion: reduce){
  .muncul{opacity:1; transform:none; transition:none}
  *{animation-duration:.01ms !important; transition-duration:.01ms !important}
}
```

Dipicu `IntersectionObserver` dengan `threshold:0.15`, sekali per elemen, lalu observer dilepas. Elemen yang sudah terlihat saat halaman dimuat tidak dianimasikan.

Yang tidak boleh ada: parallax, animasi angka menghitung naik, animasi latar, video, putaran pemuat, dan transisi lebih dari 300 ms.

Panel dan lightbox memakai 200 sampai 240 ms. Keduanya tidak boleh menahan masukan: selama animasi, tombol tutup sudah bisa diklik.

---

## 7. Aksesibilitas

| Hal | Ketentuan |
|---|---|
| Kontras teks isi | minimal 4,5:1. `--ink` pada `--page` = 13,1:1 · `--muted` = 5,1:1 · `--muted` pada `--surface` = 5,5:1 |
| `--faint` | tidak dipakai untuk teks sama sekali, hanya ikon dan placeholder. Pada `--page` nilainya hanya 2,8:1 |
| Tiga warna gap | hanya sebagai garis dan latar, tidak pernah sebagai teks. Sebagai teks, `--warn` pada latarnya hanya 3,4:1 dan `--ok` 4,3:1, keduanya di bawah 4,5:1 |
| Fokus | `outline:2px solid var(--navy-600); outline-offset:2px`. Tidak pernah `outline:none` tanpa pengganti |
| Urutan tab | mengikuti urutan visual, tanpa `tabindex` positif |
| Dialog | `role="dialog"`, `aria-modal="true"`, fokus terkunci, Escape menutup, fokus kembali ke pembuka |
| Gambar | `alt` menyebut isi ("Tabel target indikator dengan sembilan kelompok kolom"), bukan "screenshot" |
| Target sentuh | minimal 44 × 44 px |
| Bahasa | `<html lang="id">`, `lang="en"` pada istilah asing sebaris |
| Judul | satu `<h1>`, sisanya `<h2>` dan `<h3>`, tanpa melompati tingkat |
| Gerak | `prefers-reduced-motion` mematikan seluruh transisi |

---

## 8. Cetak

```css
@page{size:A4; margin:14mm 12mm}
*{print-color-adjust:exact}
```

- Navigasi, tab filter, tombol, dan lightbox tidak dicetak.
- Panel detail karya dicetak **terbuka**: seluruh isi terlihat berurutan setelah kartunya.
- Galeri jadi 2 kolom, gambar maksimal 70 mm tinggi, keterangan 8 pt.
- Tabel aturan dicetak utuh; `break-inside:avoid` pada `tr` dan `.kartu`.
- Setiap section dimulai di halaman baru hanya bila isinya melebihi setengah halaman.
- Footer memuat tanggal cetak.

---

## 9. Anggaran berat

| Bagian | Batas | Catatan |
|---|---|---|
| HTML + CSS + JS | ≤ 90 KB | tanpa kerangka kerja, tanpa build step |
| Font | 28 KB | satu berkas woff2 subset latin Plus Jakarta Sans, `font-display:swap` |
| Thumbnail galeri | ≤ 70 KB per gambar, 44 gambar | 420 px, PNG teroptimasi, `loading="lazy"` |
| Gambar lightbox | 1400 px | dimuat saat diklik, tidak di-preload |
| Muat awal di atas lipatan | ≤ 600 KB | tanpa satu pun gambar galeri |

Kalau thumbnail melewati 70 KB setelah dikompresi, turunkan lebar ke 380 px sebelum menurunkan kualitas warna. Tangkapan layar dashboard berisi teks kecil, dan teks kecil rusak lebih cepat oleh kompresi warna daripada oleh pengurangan ukuran.

---

## 10. Larangan

- Gradien, bayangan, sudut di atas 12 px, dan latar berpola.
- Merah, kuning, hijau untuk hal selain makna gap.
- Ikon berwarna. Semua ikon memakai `currentColor`.
- Teks di bawah 13 px, kecuali label huruf besar 11,5 px.
- Gulir horizontal pada 390 px.
- Em dash, en dash, dan tanda `+` di dalam prosa.
- Kata "hasil" atau "reaktif" untuk status tes. Status selalu berupa warna.
- NIK, nama klien, nama lembaga SR/SSR, nomor HP, dan angka capaian per orang.
- Permintaan ke domain luar: font, ikon, gambar, skrip, analitik.
- Kalimat pembuka yang mengulang pertanyaan pembaca, dan penutup yang merangkum ulang seluruh halaman.

---

## 11. Peta penerapan ke delapan section

| # | Section | Komponen | Latar | Catatan tata letak |
|---|---|---|---|---|
| 01 | Hero | 5.1 nav · 5.2 · 5.3 · 5.10 | `--page` | judul 7 kolom, angka 5 kolom |
| 02 | Kenapa ini dikerjakan | 5.6 varian daftar | `--page` | tiga risiko sebagai blok berlabel, bukan kartu |
| 03 | Peran saya: penerjemah | 5.6 | `--surface` | tabel tiga kolom selebar halaman |
| 04 | Karya | 5.4 · 5.5 | `--page` | tiga kartu, panel dari kanan |
| 05 | Arsitektur | 5.7 | `--page` | diagram selebar 680 satuan, di tengah |
| 06 | Bukti | 5.3 · 5.8 · 5.9 | `--surface` | tiga kelompok angka, lalu galeri |
| 07 | Cara kerja | 5.6 varian daftar | `--page` | lima butir disiplin, tiap butir satu kalimat |
| 08 | Kontak | 5.10 · 5.11 | `--page` | identitas, tombol unduh, catatan privasi |

---

## 12. Daftar periksa tampilan

Diperiksa sebelum halaman diserahkan. Semuanya bisa diukur tanpa alat khusus.

- [ ] Tidak ada nilai heksadesimal di luar blok token dan SVG diagram.
- [ ] Lebar baris prosa 62 sampai 70 karakter pada 1120 px.
- [ ] Tidak ada teks di bawah 13 px selain label 11,5 px.
- [ ] Lulus 390, 640, 768, 1120, dan 1440 px tanpa gulir horizontal.
- [ ] Tabel aturan berubah jadi blok bertumpuk di bawah 900 px, bukan digulir.
- [ ] Diagram terbaca di 390 px tanpa memperbesar.
- [ ] Galeri memuat 44 butir, tab filter menghitung benar, `aria-live` mengumumkan perubahan.
- [ ] Lightbox bisa dibuka, ditutup dengan Escape, dan fokus kembali ke gambar asal.
- [ ] Panel karya bisa dibuka, ditutup dengan Escape, dan fokus kembali ke tombol pembuka.
- [ ] `prefers-reduced-motion` mematikan seluruh transisi.
- [ ] Kontras `--ink` dan `--muted` pada `--page` dan `--surface` melewati 4,5:1.
- [ ] Cetak A4 tidak memotong kartu, tabel, atau gambar.
- [ ] Tab Network bersih dari domain luar saat halaman dibuka.
- [ ] Email di footer sesuai PRD bagian 15, dan tautan `s.id` tidak ada di halaman.
- [ ] Muat awal di atas lipatan di bawah 600 KB.
