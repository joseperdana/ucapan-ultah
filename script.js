document.addEventListener('DOMContentLoaded', function() {

  // --- PENGATURAN YANG BISA KAMU UBAH ---
  const questions = [
      { question: "Kapan tanggal jadian kita? (format: DD/MM/YYYY)", answer: "11/11/2021" },
      { question: "Di mana tempat pertama jose jemput fenna? (huruf kecil semua yaa)", answer: "bioskop" },
      { question: "Nama mamanya jose sapa ya?", answer: "wita" },
      { question: "Tempat kita nganu hohohoo", answer: "mobil" },
      { question: "1+1*0", answer: "1" }
  ];
  const namaLagu = 'assets/lagu.mp3';
  const isiSurat = `
      Hai cantikkuuu!!! CIYE DIA TUAA HAHAHAHAH 21 BROK CIHUYYY
      happy birthday yaa sayangg! selalu bangga dan merasa beruntung punya kamu di hidup aku.
      fennaa itu orang yang baikk ga hanya ke jose tapi juga ke semua orang.
      kamu sangat sangat bisa jadi berkat buat banyakk orangg
      kamu selalu bisa bawa energi positif ke orang-orang di sekitar kamu.
      aku suka banget liat kamu bahagia, karena itu juga bikin aku bahagiaaa.
      makasih yaa udah jadi kamu yang sekarang, yang selalu support aku, yang selalu ada buat aku.
      semogaa fennnaa tetap jadi fenna yang aku kenal, yang baik, yang penyayang, yang lucu, yang rameee, yang kadang ngeselin tapi selalu bisa bikin kangee ciyee cihuyyy wkwkwk
      semoga di umur yang baru ini, semua doa dan harapan kamu bisa tercapai.
      semoga kamu selalu sehat, bahagia, dan sukses di segala hal yang kamu lakuin.
      SEMAGNAT SKRIPSINYA OYYY LESGOOO LULUSSS
      abisstuuu bisaaa kerja n nabungg heheheh
      lalu MENIKAH OWYEAHHH
      aminnnnn
      aku mintaa maaff yaa kalau belum bisa memenuhii ekspektasi kamuu, i"m sorryyyy

      aku sayang fennaa, selalu.
  `;
  // -----------------------------------------

  // Variabel DOM
  const semuaHalaman = document.querySelectorAll('.halaman');
  const container = document.querySelector('.container');
  const backgroundMusic = document.getElementById('background-music');
  const paragrafSurat = document.getElementById('isi-surat');
  const tombolMulai = document.getElementById('tombol-mulai');
  const jawabanKuis = document.getElementById('jawaban-kuis');
  const tombolJawabKuis = document.getElementById('tombol-jawab-kuis');
  const kuisFeedback = document.getElementById('kuis-feedback');
  const pertanyaanKuis = document.getElementById('pertanyaan-kuis');
  const tombolMau = document.getElementById('tombol-mau');
  const tombolTidak = document.getElementById('tombol-tidak');
  const loadingText = document.getElementById('loading-text');
  const progressBar = document.querySelector('.progress-bar');
  const tombolDarurat = document.getElementById('tombol-darurat');
  let indeksPertanyaan = 0;

  function initAnimatedBackground() {
      const background = document.getElementById('background-animasi');
      const jumlahGelembung = 25;
      const colors = ['#FFC700', '#2E8B57'];
      for (let i = 0; i < jumlahGelembung; i++) {
          const gelembung = document.createElement('span');
          const size = Math.random() * 40 + 10;
          const duration = Math.random() * 10 + 10;
          const delay = Math.random() * 10;
          gelembung.style.width = `${size}px`;
          gelembung.style.height = `${size}px`;
          gelembung.style.left = `${Math.random() * 100}%`;
          gelembung.style.animationDuration = `${duration}s`;
          gelembung.style.animationDelay = `${delay}s`;
          gelembung.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          background.appendChild(gelembung);
      }
  }

  function createBungaJatuh() {
      const container = document.getElementById('animasi-bunga-jatuh');
      if (container.children.length > 0) return;
      const bungaEmoji = ['🌸', '🌼', '🌻', '🌷'];
      for (let i = 0; i < 20; i++) {
          const bunga = document.createElement('div');
          bunga.classList.add('bunga');
          bunga.textContent = bungaEmoji[Math.floor(Math.random() * bungaEmoji.length)];
          bunga.style.left = `${Math.random() * 100}vw`;
          bunga.style.animationDuration = `${Math.random() * 5 + 5}s`;
          bunga.style.animationDelay = `${Math.random() * 5}s`;
          container.appendChild(bunga);
      }
  }

  function tampilkanHalaman(idHalaman) {
      semuaHalaman.forEach(h => h.classList.remove('aktif'));
      document.getElementById(idHalaman).classList.add('aktif');
  }

  function tampilkanPertanyaan() {
      if (indeksPertanyaan < questions.length) {
          pertanyaanKuis.textContent = questions[indeksPertanyaan].question;
          jawabanKuis.value = '';
          kuisFeedback.textContent = '';
      } else {
          tampilkanHalaman('halaman-jebakan');
      }
  }

  // --- FUNGSI BARU YANG DIPERBAIKI UNTUK TOMBOL LARI ---
  function lariinTombol() {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const btnWidth = tombolMau.offsetWidth;
      const btnHeight = tombolMau.offsetHeight;

      let newTop = Math.random() * (containerHeight - btnHeight);
      let newLeft = Math.random() * (containerWidth - btnWidth);
      
      tombolMau.style.position = 'absolute';
      tombolMau.style.top = `${newTop}px`;
      tombolMau.style.left = `${newLeft}px`;
  }
  // ----------------------------------------------------

  tombolMulai.addEventListener('click', () => { tampilkanHalaman('halaman-kuis'); tampilkanPertanyaan(); });

  tombolJawabKuis.addEventListener('click', () => {
      const jawabanBenar = questions[indeksPertanyaan].answer.toLowerCase();
      const jawabanUser = jawabanKuis.value.toLowerCase().trim();
      if (jawabanUser === jawabanBenar) {
          kuisFeedback.textContent = "hoyey!! benerr...";
          kuisFeedback.style.color = 'green';
          indeksPertanyaan++;
          setTimeout(tampilkanPertanyaan, 1000);
      } else {
          kuisFeedback.textContent = "huft!! salah deh...";
          kuisFeedback.style.color = 'red';
      }
  });

  tombolMau.addEventListener('mouseover', lariinTombol); // <-- Panggil fungsi baru di sini
  tombolTidak.addEventListener('click', () => {
      if (window.innerWidth <= 768) { // Mobile
          tombolMau.classList.add('shake');
          setTimeout(() => { tombolMau.classList.remove('shake'); }, 500);
      } else { // Desktop
          lariinTombol(); // <-- Panggil fungsi baru di sini juga
      }
  });

  tombolMau.addEventListener('click', () => {
      tampilkanHalaman('halaman-prank');
      setTimeout(() => {
          tampilkanHalaman('halaman-loading-palsu');
          progressBar.classList.add('loading');
          setTimeout(() => {
              loadingText.innerHTML = "Gagal! Perasaan Jose terlalu besar untuk di-load 😂";
              tombolDarurat.style.display = 'inline-block';
          }, 3500);
      }, 2000);
  });
  
  tombolDarurat.addEventListener('click', () => {
      tampilkanHalaman('halaman-surat');
      paragrafSurat.textContent = isiSurat;
      backgroundMusic.src = namaLagu;
      backgroundMusic.play().catch(e => console.log("Autoplay ditolak browser:", e));
      createBungaJatuh();
  });

  // --- INISIALISASI ---
  tampilkanHalaman('halaman-pembuka');
  initAnimatedBackground();
});