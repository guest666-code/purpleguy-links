/* ----------------------------------------------------
   1. TEMA VE YÜZEY YÖNETİMİ (10 NEON TEMA)
   ---------------------------------------------------- */

// Kayıtlı temayı yükle veya varsayılan olarak 'purple' kullan
const savedTheme = localStorage.getItem('selectedTheme') || 'purple';
setTheme(savedTheme);

// Tema değiştirme fonksiyonu
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('selectedTheme', themeName);
}

// Tema seçim panelini aç/kapat
function toggleThemePanel() {
  const panel = document.getElementById('themePicker');
  if (panel) {
    panel.classList.toggle('active');
  }
}

/* ----------------------------------------------------
   2. BİLİNGUAL DİL DEĞİŞTİRİCİ (TR / EN)
   ---------------------------------------------------- */

const translations = {
  tr: {
    subTitle: "Developer & Modder • SGM",
    langBtnText: "EN"
  },
  en: {
    subTitle: "Developer & Modder • SGM",
    langBtnText: "TR"
  }
};

// Kayıtlı dili yükle veya varsayılan olarak 'tr' kullan
let currentLang = localStorage.getItem('selectedLang') || 'tr';
updateLanguageUI(currentLang);

function toggleLanguage() {
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  localStorage.setItem('selectedLang', currentLang);
  updateLanguageUI(currentLang);
}

function updateLanguageUI(lang) {
  // Alt başlık metni
  const subTitleEl = document.getElementById('subTitle');
  if (subTitleEl && translations[lang]) {
    subTitleEl.textContent = translations[lang].subTitle;
  }

  // Dil butonu metni
  const langBtnTextEl = document.getElementById('langBtnText');
  if (langBtnTextEl && translations[lang]) {
    langBtnTextEl.textContent = translations[lang].langBtnText;
  }

  // Buton metinlerini güncelle (data-tr ve data-en öznitelikleri üzerinden)
  const translatableElements = document.querySelectorAll('[data-tr][data-en]');
  translatableElements.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.textContent = text;
    }
  });
}

/* ----------------------------------------------------
   3. PWA SERVICE WORKER KAYDI
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
