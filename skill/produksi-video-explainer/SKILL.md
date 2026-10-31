---
name: produksi-video-explainer
description: Produksi video explainer animasi harian 9:16 (45-60 detik) dari topik yang sedang ramai, mulai dari riset bersumber, naskah, narasi suara AI, animasi gaya kliping berita dengan template kode, efek suara, render MP4, sampai caption. Pakai saat diminta membuat video explainer, Reels/Shorts/TikTok edukasi, atau melanjutkan produksi dengan template-video-explainer.
---

# Produksi video explainer 9:16

Kerjakan bertahap, dan tunjukkan hasil tiap tahap kepada pengguna sebelum lanjut, kecuali pengguna meminta langsung jadi. Tahap yang memakai kredit berbayar (misalnya suara AI) wajib menunggu persetujuan.

## Identitas channel (ganti dengan milikmu)
- Nama channel: [NAMA CHANNEL]
- Janji ke penonton: cepat paham, ada sumbernya, tidak memihak partai atau tokoh.
- Tone: santai dan cerdas, seperti teman yang rajin baca berita. Boleh jenaka, tapi tidak mengejek kelompok mana pun.
- Rubrik (contoh): Kok Bisa? (isu viral, cek fakta) · Dompet (ekonomi sehari-hari) · Diaspora · Budaya.
- Tokoh pembawa acara dan teman-temannya ada di `weyeni.js`. Tunjukkan keragaman lewat kulit, rambut, busana, dan kain, bukan lewat logat atau lelucon suku.

## Aturan redaksi (wajib)
- Setiap angka dan klaim harus punya sumber yang benar-benar dibuka (fetch halaman), bukan cuplikan hasil pencarian. Pasang kartu sumber di akhir video.
- Angka yang hanya beredar di media dan tidak ada di sumber resmi: jangan dipakai, atau tandai dengan jelas.
- Jika ejaan nama pejabat berbeda antarmedia, tulis jabatannya saja.
- Bandingkan data secara jujur. Contoh: batas rata-rata 24 jam jangan disamakan diam-diam dengan angka satu jam pengukuran; beri label.
- Jangan memakai atau menggambar logo merek pihak lain. Nama perusahaan sebagai teks biasa boleh.
- Hindari: pencarian "link video" orang biasa, anak sebagai objek viral, politik praktis yang memihak, drama selebriti, dan tuduhan kriminal terhadap perorangan. Nama dan wajah warga biasa yang viral tidak ditampilkan.
- Contoh pesan, chat, atau struk rekaan diberi label "contoh".

## Alur
1. **Topik.** Riset dengan alat pencarian gratis: isu ramai 48 jam terakhir, bukti dari lebih dari satu media. Usulkan 3 topik, masing-masing dengan judul kerja, rubrik, hook, kenapa sekarang, fakta kunci, sumber, dan umur topik. Konfirmasi pilihan ke pengguna.
2. **Naskah.** 570–750 karakter (45–60 detik). Struktur: hook (0–3 detik) → konteks bersumber → 3 poin → "Jadi intinya…" + pertanyaan untuk kolom komentar. Kalimat pendek, satu ide per kalimat. Angka ditulis dengan huruf. Satu paragraf untuk satu adegan. Tunjukkan naskah dan catat apa yang sengaja tidak dipakai beserta alasannya.
3. **Suara.** Gunakan suara asli penutur bahasa naskah (untuk bahasa Indonesia, pilih suara Indonesia dari Voice Library; suara bahasa Inggris terdengar berlogat). Model `eleven_multilingual_v2`, satu take. Jangan generate ulang untuk sekadar mencoba lagi. Kirim tautan unduh MP3 langsung ke pengguna. Bila file tidak bisa diunduh ke ruang kerja, minta pengguna melampirkannya.
4. **Waktu per kata.** Transkripsi audio (misalnya ElevenLabs Scribe) lalu simpan ke `words.js` sebagai `[[mulai, selesai], ...]`, satu entri per kata naskah. Bila layanan sedang sibuk, buat perkiraan dari naskah dulu dan ganti saat transkripsi berhasil.
5. **Animasi** di `animatic.html`. Semua waktu memakai nomor urut kata: `ws(i)`/`we(i)`, `PARA` (kata pertama tiap paragraf), `CAPW` (subtitle), `fx()` (efek suara). Gaya kliping berita: tekstur kertas, potongan sobek, selotip, stempel, tulisan tangan, judul Anton, angka 01/02/03 bergaris tepi, warna latar berbeda di tiap adegan. Komposisi tiap adegan dibuat berbeda. Transisi berbeda dan beralasan di tiap pergantian. Tokoh bergerak mulut mengikuti kata, berkedip, dan ganti pose atau ekspresi di momen penting.
6. **Cek.** `python frames.py <4–7 detik terpadat + titik transisi>`, gabungkan dengan ffmpeg hstack, lihat hasilnya, perbaiki tumpang tindih. Baru setelah itu render penuh.
7. **Render.** `NAME=judul python render.py narasi.mp3` (sekitar 4 menit).
8. **Efek suara.** `python sfx.py narasi.mp3`, lalu `ffmpeg -i judul-final.mp4 -i mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest judul-final-sfx.mp4`. Tanpa musik latar kecuali diminta.
9. **Kirim** MP4 ke pengguna. Minta pengguna mengecek di speaker HP: kecepatan subtitle, pelafalan, dan keseimbangan volume.
10. **Caption.** Instagram cukup 2 baris. Baris 1: hook + inti. Baris 2: pertanyaan untuk kolom komentar + (Sumber singkat, tanggal) + tagar channel. Untuk Shorts/TikTok: judul maksimal 60 karakter + deskripsi 1–2 kalimat dengan sumber.
