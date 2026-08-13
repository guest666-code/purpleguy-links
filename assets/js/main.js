let currentLang = localStorage.getItem('site_lang') || 'tr';

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

document.addEventListener('DOMContentLoaded', updateLanguage);

