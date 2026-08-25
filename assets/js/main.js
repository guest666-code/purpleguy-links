/* ----------------------------------------------------
   1. MEVCUT DURUM VE DEĞİŞKENLER
   ---------------------------------------------------- */
let currentLang = localStorage.getItem('site_lang') || 'tr';
let currentTheme = localStorage.getItem('site_theme') || 'purple';

/* ----------------------------------------------------
   2. BİLİNGUAL DİL MANTIĞI (TR / EN)
   ---------------------------------------------------- */
function updateLanguage() {
  const elements = document.querySelectorAll('.btn-text');
  elements.forEach(el => {
    const translation = el.getAttribute(`data-${currentLang}`);
    if (translation) {
      el.textContent = translation;
    }
  });

  const langBtnText = document.getElementById('langBtnText');
  if (langBtnText) {
    langBtnText.textContent = currentLang === 'tr' ? 'EN' : 'TR';
  }
  
  localStorage.setItem('site_lang', currentLang);
}

function toggleLanguage() {
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  updateLanguage();
}

/* ----------------------------------------------------
   3. TEMA MANTIĞI (10 NEON TEMA)
   ---------------------------------------------------- */
function setTheme(themeName) {
  currentTheme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('site_theme', themeName);
  
  // Rscripts Embed Kartının Temasını Seçilen Tema Grubuza Göre Ayarla
  const embedImg = document.querySelector('.embed-card img');
  if (embedImg) {
    const isLight = themeName === 'gold-amber';
    embedImg.src = `https://rscripts.net/api/embed/user/Purpleguy198716?theme=${isLight ? 'light' : 'dark'}`;
  }
}

function toggleThemePanel() {
  const panel = document.getElementById('themePicker');
  if (panel) {
    panel.classList.toggle('active');
  }
}

/* ----------------------------------------------------
   4. ETKİLEŞİM VE İLK YÜKLEME DİNLENİCİLERİ
   ---------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // İlk yükleme ayarlarını çalıştır
  updateLanguage();
  setTheme(currentTheme);

  // Açılış animasyonları tamamlandıktan sonra opacity kısıtlamasını kaldırır
  setTimeout(() => {
    const linkItems = document.querySelectorAll('.links-section > *');
    linkItems.forEach(item => {
      item.style.opacity = '1';
    });
  }, 1200);
});

// Tema paneli dışına tıklandığında paneli otomatik kapatır
document.addEventListener('click', (e) => {
  const panel = document.getElementById('themePicker');
  const btn = document.getElementById('themeBtn');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.remove('active');
  }
});

/* ----------------------------------------------------
   5. PWA SERVICE WORKER KAYDI
   ---------------------------------------------------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        console.log('Service Worker başarıyla kaydedildi:', reg.scope);
      })
      .catch((err) => {
        console.error('Service Worker kaydı başarısız:', err);
      });
  });
}
