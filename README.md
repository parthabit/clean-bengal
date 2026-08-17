# 🌿 Clean Bengal 

> A civic technology portal for West Bengal citizens to report dirty/unsafe areas with GPS photo uploads. Authorities get real-time alerts and must act within 24 hours.

> **Built for educational purposes** by a 3rd year Computer Science student.   
--- 
## Features
   
- 📷 Photo upload with auto-compression 
- 📍 GPS map pin (Leaflet.js + OpenStreetMap)
- 🤖 AI-powered complaint analysis (Google Gemini)
- 🔴 Real-time admin dashboard (Firebase Firestore)
- 🔒 Login-protected authority portal
- 📊 Export complaints to Excel (CSV) / PDF
- 🗑️ Delete old resolved records
- 🗺️ District-wise complaint filtering
- ⏱️ 24-hour action commitment

---
## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Map | Leaflet.js + OpenStreetMap + Nominatim 
| Database | Firebase Firestore (real-time, free tier) |
| Hosting | Netlify (free tier) |
| AI | Google Gemini 1.5 Flash (free API) |
| Serverless | Netlify Functions (Node.js) |
| Version Control | Git + GitHub |

---
## Project Structure

```
clean-bengal/
├── index.html                  ← Entire frontend (single file)
├── netlify.toml                ← Netlify build config
├── netlify/functions/
│   └── ai.js                  ← Serverless AI proxy (hides API key)
└── README.md
---

## Setup & Deploy

### 1. Firebase
1. Go to console.firebase.google.com → Create project
2. Firestore Database → Create → Start in test mode → asia-south1
3. Project Settings → Web app → Copy firebaseConfig
4. Paste config values into `index.html`

### 2. Gemini API Key (Free)
1. Go to aistudio.google.com → Get API Key → Create
2. No credit card needed

### 3. Deploy to Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
netlify env:set GEMINI_API_KEY YOUR_KEY_HERE
netlify deploy --prod --dir .
```

### 4. Change Admin Credentials
Find in `index.html` and update before going public:
```js
const ADMINS=[{user:'admin',pass:'your-password'}];

---

## Admin Login (Demo)
| Username | Password |
|---|---|
| admin | wb@2026 |
| partha | 1234 |

---

## Future Improvements
- [ ] Firebase Authentication (replace hardcoded login)
- [ ] SMS notifications via Fast2SMS
- [ ] Per-district officer accounts
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

---

## License
MIT — Free to use, modify, and distribute.
