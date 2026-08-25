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

  // Sitedeki tum [data-tr] ve [data-en] etiketli metinleri güncelle
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

// --- 3. EASTER EGG TETİKLEYİCİLERİ (KLAVYE VE MOBİL) ---

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

// 3.2. Mobil İçin 5 Kez Profil Başlığına Tıklama Tetikleyicisi
let titleClickCount = 0;
let titleClickTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  const profileTitle = document.getElementById('profileTitle');
  
  if (profileTitle) {
    profileTitle.addEventListener('click', () => {
      titleClickCount++;
      
      clearTimeout(titleClickTimer);
      titleClickTimer = setTimeout(() => {
        titleClickCount = 0;
      }, 2000); // 2 saniye içinde tıklanmazsa sayacı sıfırla

      if (titleClickCount >= 5) {
        triggerEasterEgg();
        titleClickCount = 0;
      }
    });
  }
});

// --- 4. GİZLİ SİSTEM ÇÖKME VE 404 EASTER EGG SENARYOSU ---
let isEasterEggActive = false;

function triggerEasterEgg() {
  if (isEasterEggActive) return; // Birden fazla kez basılmasını engelle
  isEasterEggActive = true;

  const song = document.getElementById('easterSong');

  // A. Şarkıyı Başlat
  if (song) {
    song.currentTime = 0;
    song.play().catch(err => console.log("Oynatma engellendi:", err));
  }

  // B. Ekran Şiddetle Sallanmaya Başlar (Deprem Efekti)
  document.body.classList.add('shake-active');

  // C. Butonlar ve Kartlar TEK TEK Yerçekimiyle Düşmeye Başlar
  const targets = Array.from(document.querySelectorAll('.profile-header, .header-actions, .links-section > *'));

  targets.forEach((el, index) => {
    setTimeout(() => {
      // Rastgele sağa/sola savrulma ve dönme açısı
      const randomRotate = (Math.random() - 0.5) * 120;
      const randomX = (Math.random() - 0.5) * 300;
      
      el.classList.add('falling-element');
      el.style.transform = `translate(${randomX}px, 110vh) rotate(${randomRotate}deg)`;
      el.style.opacity = '0';
    }, 1200 + (index * 400)); // Her eleman 0.4 saniye arayla düşer
  });

  // D. Tüm Butonlar Düşünce Kart Çerçevesi Yarılır ve Düşer
  const totalFallTime = 1200 + (targets.length * 400) + 400;

  setTimeout(() => {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.add('shatter-fall');
    }
  }, totalFallTime);

  // E. Bembeyaz 404 Ekranı Gelir
  setTimeout(() => {
    document.body.classList.remove('shake-active'); // Sallantıyı durdur

    const errorScreen = document.getElementById('errorScreen');
    if (errorScreen) {
      errorScreen.classList.add('show');
    }

    // F. 3 Saniye Sonra Sayfa Sıfırlanır (Hiçbir Şey Olmamış Gibi!)
    setTimeout(() => {
      window.location.reload();
    }, 3000);

  }, totalFallTime + 1200);
}
