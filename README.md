# Portofolio Profesional: Arif Maulana Ade Putra

Landing page portofolio personal dan dokumentasi teknis rekayasa sistem pemantauan program (*monitoring and evaluation*).

## Ringkasan Proyek

Portofolio ini mendokumentasikan transformasi alur data dari lembar kerja Excel bervolume tinggi menjadi sistem web teruji yang dioperasikan di atas server fisik mandiri:

1. **Perancangan Formula di Excel (Cetak Biru):**  
   Menyusun 57 lembar kerja, 379.503 baris data penjangkauan, 136 kolom bantu, dan 24.578 rumus rekapitulasi capaian program HIV berbasis Petunjuk Teknis (Juknis) Penjangkauan dan Rujukan PR Spiritia 2024. Seluruh logika hitung dirancang langsung dari pengalaman mengolah data lapangan untuk memodelkan indikator program.

2. **Pengembangan Aplikasi dan Dasbor Web:**  
   Menerjemahkan kerangka Theory of Change dan 84 aturan teknis Juknis ke dalam aplikasi web (Next.js dan PostgreSQL). Sistem mengunci seluruh kalkulasi dengan 1.003 pengujian otomatis agar angka laporan tidak menyimpang, dengan bantuan AI untuk mempercepat penulisan kode program.

3. **Pengelolaan Server Fisik di Kantor (On-Premise):**  
   Menyiapkan dan mengoperasikan server fisik lokal (Lenovo ThinkCentre M710s, Windows 10, PM2, Docker PostgreSQL) yang diakses secara aman melalui Cloudflare Tunnel tanpa membuka port publik ke internet.

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

