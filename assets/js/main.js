let currentLang = localStorage.getItem('site_lang') || 'tr';
let currentTheme = localStorage.getItem('site_theme') || 'purple';

// --- DİL MANTIĞI ---
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

// --- TEMA MANTIĞI (10 TEMA) ---
function setTheme(themeName) {
  currentTheme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('site_theme', themeName);
  
  // Rscripts Embed Kartının Teması
  const embedImg = document.querySelector('.embed-card img');
  if (embedImg) {
    // Sadece açık/parlak arka planı olan temalarda light yap
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

// --- ETKİLEŞİM DİNLENİCİLERİ ---
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
  setTheme(currentTheme);
});

// Tema paneli dışına tıklandığında paneli kapat
document.addEventListener('click', (e) => {
  const panel = document.getElementById('themePicker');
  const btn = document.getElementById('themeBtn');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.remove('active');
  }
});
