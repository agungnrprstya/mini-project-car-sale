# DESIGN.md: Bandar Mobil

> Arah desain ini disusun oleh agent, bukan oleh pemilik produk. Selera default agent cenderung
> jatuh ke pilihan generik, jadi anggap setiap field di bawah bisa diveto. Ganti nilainya saja,
> struktur file ini tidak perlu berubah.

## Design Read

Reading this as: a car-dealer catalog (landing + listing) for Indonesian retail buyers, in an
automotive showroom + dealer window-sticker visual language, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

## Dials

| Dial | Nilai | Alasan |
|---|---|---|
| ENERGY | 2 | Katalog ritel: percaya diri lewat ukuran foto dan angka harga, bukan lewat dekorasi atau animasi besar. |
| RHYTHM | 2 | Landing memakai hero asimetris (teks + panel foto), /product memakai header katalog + rail filter + grid + pagination. Dua komposisi berbeda, sisanya konsisten. |
| MOTION | 1 | Yang bergerak hanya state hover/focus dan perpindahan slide carousel. Tidak ada scroll-reveal: katalog dibaca cepat, animasi masuk hanya menunda isi. |

## Identity

- Produk: Bandar Mobil, katalog mobil untuk dijual (halaman `/` dan `/product`).
- Audiens: pembeli ritel Indonesia, banyak yang membuka dari ponsel, keputusan berbasis foto dan harga.
- Karakter: showroom. Permukaan terang, tenang, tanpa hiasan; foto mobil adalah fokus tiap layar.

## Palette (2 core + 1 accent)

| Token | Nilai | Peran |
|---|---|---|
| `ink` | `#141821` | Struktur: heading, teks utama, tombol solid, permukaan gelap. |
| `paper` | `#F4F2EE` | Permukaan halaman (abu hangat ala lantai showroom). Kartu memakai putih agar terangkat tanpa shadow. |
| `signal` | `#C8102E` | Satu accent: harga, CTA utama, underline nav aktif, indikator slide aktif, focus ring. |

Turunan netral: `ink-soft` `#3A4250`, `ink-mute` `#565D68` (teks sekunder), `paper-line` `#DFDAD1` (garis pemisah).

Kontras terverifikasi (WCAG AA): putih di atas `signal` 5.88:1, `signal` di atas putih 5.88:1,
`ink-mute` di atas putih 6.64:1, `ink-mute` di atas `paper` 5.94:1, `ink` di atas `paper` 15.89:1,
putih di atas `ink` 17.76:1.

## Typography

- Satu keluarga: Poppins (sudah dipakai proyek ini). Tidak ada font kedua: satu keluarga menjaga
  ritme tetap tenang dan menghindari beban unduhan tambahan.
- Bobot: 400 body, 500 label, 600 judul dan harga.
- Angka harga memakai `tabular-nums` supaya digit tidak bergeser saat nilai berbeda antar kartu.
- Tidak ada label uppercase dengan letter-spacing lebar: label spec plate memakai sentence case.

## Radius

| Skala | Pemakaian |
|---|---|
| `rounded-md` | chip filter, tombol kecil, spec plate |
| `rounded-lg` | kartu, panel carousel |
| `rounded-full` | hanya kontrol ikon bulat (panah carousel, tombol menu mobile) |

Tidak ada tombol teks berbentuk pill: radius dipakai untuk hierarki, bukan gaya seragam.

## Identity motif: dealer spec plate

Setiap kartu mobil punya satu blok bergaris tipis berisi pasangan label/nilai (Category, Price),
meniru stiker spec di kaca mobil dealer. Blok ini yang mengulang di seluruh katalog, jadi
identitasnya datang dari struktur data mobil, bukan dari dekorasi.

## Tema

Fixed light, tanpa toggle. Alasan: foto mobil adalah konten utama, dan permukaan terang membuat
foto serta harga terbaca tanpa penyesuaian; brand yang ada (navbar putih, aksen merah) memang
light-first. Ini keputusan berbasis konten, bukan "default karena malas".

## Alasan per keputusan (R-31)

- Warna: `ink` dan `paper` menahan perhatian pada foto; `signal` merah diambil dari accent yang sudah
  dipakai brand (harga dan tombol logout) supaya identitasnya tidak berubah.
- Layout landing: hero asimetris 5/7 karena panel foto butuh lebar, sementara teks cukup satu kolom
  sempit untuk dibaca.
- Layout /product: header katalog + rail filter di atas grid, karena pemfilteran adalah aksi pertama
  yang dicari pembeli di halaman daftar.
- Tipografi: satu keluarga dan skala bobot, karena halaman ini dibaca cepat dan tidak butuh suara
  kedua.
- Spacing: gutter `px-4 sm:px-6 lg:px-8` dengan jarak antar-section `py-12 lg:py-16`, satu ritme untuk
  semua section supaya grid tidak berubah lebar saat berpindah halaman.
- Kartu: dipakai karena tiap mobil adalah satu unit data yang berdiri sendiri (foto, kategori, harga)
  dan dibandingkan berdampingan.
- Ikon: hanya ikon yang punya arti jelas (chevron navigasi, hamburger menu, spinner). Tidak ada ikon
  dekoratif di kartu atau judul section.
- Tanpa carousel autoplay: tidak ada kontrol pause yang perlu dibangun, dan slide yang bergerak sendiri
  mengganggu pembacaan harga.
