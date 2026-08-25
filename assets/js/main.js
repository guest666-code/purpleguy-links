/* ====================================================
   PURPLEGUY LINKTREE - EKSİKSİZ JAVASCRIPT KODLARI
   ==================================================== */

// --- 1. DİL DEĞİŞTİRME SİSTEMİ (TR / EN) ---
let currentLang = 'TR';

function toggleLanguage() {
  currentLang = currentLang === 'TR' ? 'EN' : 'TR';
  const langBtnText = document.getElementById('langBtnText');
  
  if (langBtnText) {
    langBtnText.textContent = currentLang === 'TR' ? 'EN' : 'TR';
  }

  // Sitedeki tüm [data-tr] ve [data-en] etiketli metinleri güncelle
  const elements = document.querySelectorAll('[data-tr]');
  elements.forEach(el => {
    if (currentLang === 'TR') {
      el.textContent = el.getAttribute('data-tr');
    } else {
      el.textContent = el.getAttribute('data-en');
    }
  });
}

// --- 2. 10 NEON TEMA DEĞİŞTİRME SİSTEMİ ---
function toggleThemePanel() {
  const panel = document.getElementById('themePicker');
  if (panel) {
    panel.classList.toggle('active');
  }
}

function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('selectedTheme', themeName);
}

// Sayfa yüklendiğinde hafızadaki temayı uygula
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'purple';
  setTheme(savedTheme);
});

// --- 3. EASTER EGG TETİKLEYİCİLERİ (KLAVYE VE MOBİL/TABLET) ---

// 3.1. Klavye Konami Kodu (Yukarı, Yukarı, Aşağı, Aşağı, Sol, Sağ, Sol, Sağ, B, A)
const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  
  if (key === konamiCode[konamiIndex].toLowerCase()) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// 3.2. Mobil & Tablet İçin 5 Kez Profil Başlığına Tıklama Sayacı
let tapCount = 0;
let tapTimer = null;

function registerTap() {
  tapCount++;

  // 3 saniye içinde 5 kere art arda basılması yeterli
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => {
    tapCount = 0;
  }, 3000);

  // 5 kere basıldığında epik kıyamet senaryosu başlar!
  if (tapCount >= 5) {
    tapCount = 0;
    triggerEasterEgg();
  }
}

// --- 4. GİZLİ SİSTEM ÇÖKME VE 404 EASTER EGG SENARYOSU (3 DAKİKA 36 SANİYE) ---
let isEasterEggActive = false;

function triggerEasterEgg() {
  if (isEasterEggActive) return; // Birden fazla kez tetiklenmesini önle
  isEasterEggActive = true;

  const song = document.getElementById('easterSong');

  // A. Şarkıyı Başlat
  if (song) {
    song.currentTime = 0;
    song.play().catch(err => console.log("Oynatma engellendi:", err));
  }

  // B. Ekran Sallantısını Başlat
  document.body.classList.add('shake-active');

  // C. Butonlar 3 Dakikalık Süreye Yayılarak Tek Tek Düşer
  const targets = Array.from(document.querySelectorAll('.profile-header, .header-actions, .links-section > *'));

  targets.forEach((el, index) => {
    // İlk düşüş 15. saniyede başlar, diğerleri 20'şer saniye arayla kayar
    const fallDelay = 15000 + (index * 20000); 

    setTimeout(() => {
      const randomRotate = (Math.random() - 0.5) * 90;
      const randomX = (Math.random() - 0.5) * 250;
      
      el.classList.add('falling-element');
      el.style.transform = `translate(${randomX}px, 110vh) rotate(${randomRotate}deg)`;
      el.style.opacity = '0';
    }, fallDelay);
  });

  // D. 3 Dakika 33. Saniyede (213,000 ms) Ana Kapsayıcı Yarılıp Düşer
  setTimeout(() => {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.add('shatter-fall');
    }
  }, 213000);

  // E. Tam 3 Dakika 36 Saniyede (216,000 ms) Bembeyaz 404 Ekranı Gelir
  setTimeout(() => {
    document.body.classList.remove('shake-active'); // Sallantıyı durdur

    const errorScreen = document.getElementById('errorScreen');
    if (errorScreen) {
      errorScreen.classList.add('show');
    }

    // F. 3 Saniye Sonra Sayfa Hiçbir Şey Olmamış Gibi Başa Döner
    setTimeout(() => {
      window.location.reload();
    }, 3000);

  }, 216000); // Toplam süre: 3 dakika 36 saniye!
}
