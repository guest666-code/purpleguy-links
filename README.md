# ⚡ Purpleguy - Cyber-Neon Personal Profile Page

![Version](https://img.shields.io/badge/version-1.0.0-purple.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-success.svg)
![Theme Engine](https://img.shields.io/badge/Themes-10--Selectable-magenta)

Geliştirici ve mod yapımcısı **Purpleguy (SGM)** için özel olarak tasarlanmış; modern **Cyber-Neon** estetiğine sahip, çoklu dil destekli, PWA uyumlu ve içerisinde gizli bir **System Crash Easter Egg** barındıran modüler bağlantı paneli (Linktree alternatifi).

---

## 🌟 Öne Çıkan Özellikler

* 🎨 **10 Farklı Cyber-Neon Tema:** Tek tıkla değiştirilebilir dinamik renk paletleri (Mor, Cyan, Matrix Yeşili, Crimson, Sunset, Gold, Hot Pink, Ocean Blue, Emerald, Monokrom).
* 🌍 **Çoklu Dil Desteği (TR/EN):** HTML `data-` öznitelikleri üzerinden anlık ve kesintisiz dil değişimi.
* 📱 **PWA (Progressive Web App) Desteği:** Mobil cihazlara uygulama gibi yüklenebilme, `manifest.json` ve Offline desteği.
* 💥 **Epik System Crash Easter Egg:**
  * Masaüstünde **Konami Kodu** (`↑ ↑ ↓ ↓ ← → ← → B A`) veya mobil cihazlarda profil başlığına **5 defa hızlıca tıklayarak** tetiklenir.
  * Özel olarak üretilmiş **8-bit Synthwave** müzik eşliğinde ekran şiddetle sallanır.
  * Sitedeki butonlar yerçekimi fiziğiyle tek tek aşağı yuvarlanır.
  * Ana kapsayıcı çerçeve tam ortadan yarılıp çöker.
  * Ekran bembeyaz bir `404 ERROR: Site Not Found` uyarısı verdikten 3 saniye sonra sayfa otomatik olarak hiçbir şey olmamış gibi sıfırlanır.
* 🛠️ **Rscripts Embed Entegrasyonu:** Rscripts geliştirici profilini canlı olarak gösteren özel kart tasarımı.

---

## 📁 Proje Dosya Yapısı

```text
.
├── index.html                 # Ana HTML5 yapı ve modal kaplamaları
├── manifest.json              # PWA yapılandırma dosyası
├── sw.js                      # Service Worker (Çevrimdışı erişim için)
├── README.md                  # Proje dokümantasyonu
└── assets/
    ├── css/
    │   └── style.css          # Tema değişkenleri, 8-bit animasyonlar & efektler
    ├── js/
    │   └── main.js            # Dil, Tema, Konami & Çöküş senaryo mantığı
    ├── audio/
    │   └── easter-song.mp3    # Özel 8-bit Synthwave Easter Egg şarkısı
    └── images/
        ├── favicon.ico        # Site ikonları
        ├── icon-192.png       # PWA 192x192 ikonu
        └── icon-512.png       # PWA 512x512 ikonu
