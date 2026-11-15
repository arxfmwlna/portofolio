# Portofolio Profesional: Arif Maulana Ade Putra

Landing page portofolio personal dan dokumentasi teknis rekayasa sistem pemantauan program (*monitoring and evaluation*).

## Ringkasan Proyek

Portofolio ini mendokumentasikan transformasi alur data dari lembar kerja Excel bervolume tinggi menjadi sistem web teruji yang dioperasikan di atas server fisik mandiri:

1. **Cetak Biru Logika Analitik (Excel Makro):**  
   Mesin kalkulasi 57 sheet, 379.503 baris data penjangkauan, 136 kolom bantu validasi, dan 24.578 rumus rekapitulasi capaian program HIV berbasis Petunjuk Teknis (Juknis) Penjangkauan dan Rujukan PR Spiritia 2024. Dirancang langsung dari pengalaman lapangan untuk memodelkan seluruh aturan indikator program.

2. **Aplikasi Web dan Dashboard Teruji:**  
   Penerjemahan kebutuhan pemantauan implementasi *Theory of Change* dan 84 aturan teknis Juknis ke dalam aplikasi web terintegrasi (Next.js, PostgreSQL). Seluruh logika bisnis dan kalkulasi dikunci oleh 1.003 uji otomatis untuk menjamin integritas data tanpa deviasi, dengan AI dimanfaatkan secara terarah sebagai akselerator penulisan kode.

3. **Infrastruktur Server Mandiri (On-Premise):**  
   Pengadaan, perakitan, dan pengoperasian server lokal (Lenovo ThinkCentre M710s, Windows 10, PM2, Docker PostgreSQL) yang diakses aman via Cloudflare Tunnel terenkripsi dengan nol port masuk publik terbuka.

## Struktur Repositori

```text
├── index.html                             # Halaman utama portofolio (landing page)
├── README.md                              # Dokumentasi repositori
├── assets/
│   ├── app.js                             # Skrip interaksi, filter galeri & dialog modal
│   ├── data-galeri.js                     # Data manifest 44 tangkapan layar sistem
│   ├── gaya.css                           # Lembar gaya utama (responsif & ramah cetak)
│   ├── font/
│   │   └── plus-jakarta-sans-latin.woff2  # Berkas font mandiri (offline-first)
│   └── img/                               # Tangkapan layar sistem & foto profil resmi
└── dokumen/
    ├── 01-portofolio-perhitungan-excel.pdf
    ├── 02-portofolio-website-monitoring.pdf
    ├── 03-portofolio-private-server-windows10.pdf
    ├── 01-studi-kasus-excel-makro.html     # Dokumen teknis versi web
    ├── 01-studi-kasus-excel-makro.pdf      # Dokumen teknis versi cetak resmi
    ├── 01-studi-kasus-excel-makro.md       # Ringkasan studi kasus biner
    └── cv-arif-maulana-ade-putra-2026.pdf  # Curriculum Vitae resmi
```

## Karakteristik Teknis

- **Standar Aksesibilitas:** WCAG 2.1 Level AA dengan kontras tinggi dan dukungan navigasi keyboard penuh.
- **Prinsip Privasi:** 100% data pribadi klien dan data rahasia program telah disanitasi penuh.
- **Kemandirian (Zero External Dependency):** Beroperasi tanpa CDN eksternal (*offline-first*).

---
© 2026 Arif Maulana Ade Putra · Jakarta Timur

