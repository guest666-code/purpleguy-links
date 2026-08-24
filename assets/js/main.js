let currentLang = localStorage.getItem('site_lang') || 'tr';
let currentTheme = localStorage.getItem('site_theme') || 'purple';

// --- DİL MANTIĞI ---
function updateLanguage() {
  const elements = document.querySelectorAll('.btn-text');
  elements.forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
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
  
  // Rscripts Embed Kartının Temasını Seçilen Tema Grubuza Göre Ayarla
  const embedImg = document.querySelector('.embed-card img');
  if (embedImg) {
    const isLight = themeName === 'dark-monochrome' || themeName === 'gold-amber';
    embedImg.src = `https://rscripts.net/api/embed/user/Purpleguy198716?theme=${isLight ? 'light' : 'dark'}`;
  }
}

function toggleThemePanel() {
  const panel = document.getElementById('themePicker');
  if (panel) {
    panel.classList.toggle('active');
  }
}

// --- İLK YÜKLEME ---
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
  setTheme(currentTheme);
});
