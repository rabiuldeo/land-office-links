# 🏛️ Rabiuls Office — ভূমি সেবা কেন্দ্র

> বাতিসা ইউনিয়ন ভূমি অফিসের ডিজিটাল সার্ভিস পোর্টাল

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=flat-square&logo=github)](https://rabiuldeo.github.io/land-office-links/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue?style=flat-square&logo=pwa)](https://rabiuldeo.github.io/land-office-links/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

## 📌 পরিচিতি

**Rabiuls Office** হলো বাতিসা ইউনিয়ন ভূমি অফিসের জন্য তৈরি একটি আধুনিক, পেশাদার ডিজিটাল সার্ভিস পোর্টাল। এটি ভূমি সেবা, নামজারি, খতিয়ান ও বিভিন্ন সরকারি সেবার দ্রুত অ্যাক্সেস প্রদান করে।

**Progressive Web App (PWA)** হওয়ায় এটি মোবাইলে ইন্সটল করে অ্যাপের মতো ব্যবহার করা যায়।

---

## ✨ ফিচারসমূহ

- 📱 **Fully Responsive** — মোবাইল, ট্যাবলেট, ডেস্কটপ সব ডিভাইসে পারফেক্ট
- 🔧 **PWA (Progressive Web App)** — মোবাইলে হোমস্ক্রিনে ইন্সটল করা যায়
- 🔤 **Noto Sans Bengali** — সুন্দর বাংলা ফন্ট
- 🗂️ **Sidebar Navigation** — পরিষ্কার ও সহজ নেভিগেশন
- 📋 **Todo / Task Manager** — অফিসের দৈনন্দিন কাজ ট্র্যাক করার সুবিধা
- 📢 **News Ticker** — স্ক্রলিং নোটিশ বার
- 🌐 **Offline Support** — ইন্টারনেট না থাকলেও ক্যাশড কন্টেন্ট দেখায়
- 🎨 **Modern Design** — পেশাদার সবুজ থিম, অ্যানিমেশন সহ
- ♿ **Accessible** — ARIA লেবেল ও সিমান্টিক HTML ব্যবহার

---

## 🔗 লিংক সমূহ

### ভূমি ও নাগরিক সেবা
| সেবা | লিংক |
|------|-------|
| ভূমি মন্ত্রণালয় | [minland.gov.bd](https://minland.gov.bd/) |
| ভূমি ড্যাশবোর্ড | [dashboard.land.gov.bd](https://dashboard.land.gov.bd/dashboard) |
| নামজারি আবেদন | [mutation.land.gov.bd](https://mutation.land.gov.bd/) |
| খতিয়ান ও ম্যাপ | [eporcha.gov.bd](https://www.eporcha.gov.bd/) |
| উত্তরাধিকার | [uttoradhikar.gov.bd](https://uttoradhikar.gov.bd/) |
| জন্মসনদ যাচাই | [everify.bdris.gov.bd](https://everify.bdris.gov.bd/) |

---

## 📂 প্রজেক্ট স্ট্রাকচার

```
land-office-links/
├── index.html              # প্রধান পেজ
├── offline.html            # অফলাইন ফলব্যাক পেজ
├── manifest.json           # PWA ম্যানিফেস্ট
├── sw.js                   # Service Worker
├── README.md               # ডকুমেন্টেশন
├── LICENSE                 # লাইসেন্স
├── .gitignore              # Git ignore
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages Auto Deploy
├── css/
│   └── style.css           # মূল স্টাইলশিট
├── js/
│   └── app.js              # মূল জাভাস্ক্রিপ্ট
└── assets/
    └── icons/
        ├── logo.svg        # সাইট লোগো
        └── favicon.svg     # ফেভিকন
```

---

## 🚀 ব্যবহার

### GitHub Pages এ হোস্ট করার পদ্ধতি

1. এই রিপোজিটরিটি Fork করুন বা নতুন রিপো তৈরি করুন
2. সব ফাইল push করুন:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Rabiuls Office"
   git branch -M main
   git remote add origin https://github.com/rabiuldeo/land-office-links.git
   git push -u origin main
   ```
3. GitHub Settings → Pages → Source: `main` branch → Save
4. কিছুক্ষণ পর `https://rabiuldeo.github.io/land-office-links/` এ লাইভ হবে

### মোবাইলে ইন্সটল করার পদ্ধতি

**Android (Chrome):**
- সাইটটি Chrome এ খুলুন
- নিচের বার থেকে "অ্যাপ ইন্সটল করুন" বা "Add to Home Screen" বাটনে ট্যাপ করুন

**iOS (Safari):**
- Safari তে সাইট খুলুন
- Share বাটন → "Add to Home Screen" সিলেক্ট করুন

---

## 🛠️ টেকনোলজি

- **HTML5** — সিমান্টিক মার্কআপ
- **CSS3** — CSS Variables, Grid, Flexbox, Animations
- **Vanilla JavaScript** — কোনো ফ্রেমওয়ার্ক ছাড়া
- **PWA** — Service Worker, Web App Manifest
- **Font Awesome 6** — আইকন
- **Google Fonts** — Noto Sans Bengali

---

## 👨‍💻 ডেভেলপার

**রবিউল হাসান** | Data Entry Operator, বাতিসা ইউনিয়ন ভূমি অফিস

| প্ল্যাটফর্ম | লিংক |
|------------|------|
| 🌐 Website | [www.rabiulh.com](https://www.rabiulh.com) |
| 📘 Facebook | [fb.com/rabiul49](https://fb.com/rabiul49) |
| 📺 YouTube | [@rabiul49](https://youtube.com/@rabiul49) |
| 📧 Email | [rabiulhasan613@gmail.com](mailto:rabiulhasan613@gmail.com) |
| 📞 Phone | [+880 1886 828042](tel:+8801886828042) |

---

## 📄 লাইসেন্স

MIT License — বিস্তারিত দেখুন [LICENSE](LICENSE) ফাইলে।

---

<p align="center">
  <strong>Rabiuls Office</strong> — ডিজিটাল প্রযুক্তিতে স্মার্ট ভূমি সেবা 🌿
</p>
