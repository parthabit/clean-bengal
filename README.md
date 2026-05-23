# Clean Bengal Portal — Deployment Guide

## Project Structure
```
clean-bengal/
├── index.html                  ← Main app
├── netlify.toml                ← Netlify config
├── netlify/functions/
│   └── ai.js                  ← Secure AI proxy (hides API key)
└── README.md
```

---

## Step 1 — Firebase Setup (Free)

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `clean-bengal` → Continue
3. Disable Google Analytics (not needed) → Create project
4. Click **Firestore Database** in left sidebar → **Create database**
   - Choose **Start in test mode** → Next → Select region (asia-south1) → Enable
5. Click the ⚙️ gear icon → **Project settings**
6. Under **Your apps**, click `</>` (Web) → Register app name → **Register**
7. Copy the `firebaseConfig` object shown

**Paste into index.html** — find this section and replace the PASTE_* values:
```js
const firebaseConfig = {
  apiKey:            "PASTE_API_KEY",
  authDomain:        "PASTE_AUTH_DOMAIN",
  projectId:         "PASTE_PROJECT_ID",
  storageBucket:     "PASTE_STORAGE_BUCKET",
  messagingSenderId: "PASTE_MESSAGING_SENDER_ID",
  appId:             "PASTE_APP_ID"
};
```

---

## Step 2 — Get FREE Gemini API Key

1. Go to https://aistudio.google.com
2. Click **Get API Key** → **Create API Key** → Copy it
3. No credit card needed — free forever (1500 requests/day)

---

## Step 3 — Deploy to Netlify

```bash
# Install Netlify CLI (once)
npm install -g netlify-cli

# Go into project folder
cd clean-bengal

# Login (opens browser)
netlify login

# Deploy
netlify deploy --prod --dir .
```

When prompted for a site name, enter: `clean-bengal-portal`
Your site will be live at: **https://clean-bengal-portal.netlify.app**

---

## Step 4 — Add Gemini API Key as Environment Variable

```bash
netlify env:set GEMINI_API_KEY AIzaSy-XXXXXXXXXXXXXXXX
```

Or via Netlify dashboard:
1. Site Configuration → Environment Variables → Add variable
2. Key: `GEMINI_API_KEY` | Value: your key

Then redeploy:
```bash
netlify deploy --prod --dir .
```

---

## Step 5 — Change Admin Credentials

Open `index.html`, find this line and change the passwords before going live:

```js
const ADMINS=[{user:'admin',pass:'wb@2026'},{user:'partha',pass:'1234'}];
```

---

## Firestore Security Rules (Important before going public)

In Firebase Console → Firestore → Rules, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /complaints/{id} {
      allow create: if true;           // Anyone can submit
      allow read, update: if false;    // Only via admin panel (add real auth later)
    }
  }
}
```

---

## Done! Your URLs

| URL | Purpose |
|-----|---------|
| `https://clean-bengal-portal.netlify.app` | Public complaint form |
| `https://clean-bengal-portal.netlify.app` → Authority tab | Admin login (protected) |

---

## Optional: Custom Domain
```bash
netlify domains:add yourcustomdomain.com
```
Then update DNS records at your domain registrar as shown by Netlify.
