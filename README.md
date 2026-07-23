<div align="center">

# ✨ Hadi Portfolio

**A modern, full-stack personal portfolio with a built-in admin dashboard.**
Update projects, skills, resume, and content live — zero redeploys required.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-hadi--portfolio--view.netlify.app-8b5cf6?style=for-the-badge)](https://hadi-portfolio-view.netlify.app)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

![Last Commit](https://img.shields.io/github/last-commit/Abdul-Hadi-del/hadi-portfolio?style=flat-square&color=8b5cf6)
![Repo Size](https://img.shields.io/github/repo-size/Abdul-Hadi-del/hadi-portfolio?style=flat-square&color=8b5cf6)
![Stars](https://img.shields.io/github/stars/Abdul-Hadi-del/hadi-portfolio?style=flat-square&color=8b5cf6)

</div>

---

## ✨ Features

### Public Site
- Animated hero section with photo/video avatar
- About, Skills, Projects, and Contact sections
- Smooth page transitions powered by Framer Motion
- Custom cursor trail effect
- Contact form with email notifications (EmailJS)
- Fully responsive design

### Admin Dashboard
- Secure login (Firebase Authentication)
- Add, edit, and delete projects — with live image previews and gallery management
- Add and manage skills
- Edit About section content and stats
- Update social links (GitHub, LinkedIn, Email)
- Upload/replace resume PDF
- Upload hero avatar (photo or video)
- View and manage contact form submissions
- All changes reflect on the live site instantly — no redeploy required

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Routing | React Router |
| Backend / Database | Firebase (Firestore + Authentication) |
| Contact Form | EmailJS |
| Icons | React Icons, Lucide React |
| Hosting | Netlify |

---

## 📂 Project Structure

src/
├── admin/
│ ├── AdminLogin.jsx
│ └── AdminDashboard.jsx
├── components/
│ ├── Navbar.jsx
│ ├── Hero.jsx
│ ├── About.jsx
│ ├── Skills.jsx
│ ├── Projects.jsx
│ ├── ProjectModal.jsx
│ ├── Contact.jsx
│ ├── Footer.jsx
│ ├── LoadingScreen.jsx
│ └── CursorTrail.jsx
├── utils/
│ └── uploadImage.js
├── firebase.js
├── App.jsx
└── main.jsx


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Firebase project with Firestore and Authentication enabled

### Installation

```bash
git clone https://github.com/Abdul-Hadi-del/hadi-portfolio.git
cd hadi-portfolio
npm install
```

### Configuration

Add your Firebase project credentials in `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## 🔐 Firestore Security

Firestore rules are configured so that:
- `projects` and `skills` are publicly readable but only writable by an authenticated admin
- `messages` (contact form submissions) can be created by anyone but only read/managed by an authenticated admin

---

## 📦 Deployment

This project is deployed on **Netlify**, connected directly to this GitHub repository. Every push to `main` triggers an automatic rebuild and deploy.

Build settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

---

<div align="center">

## 👤 Author

**Abdul Hadi Akram**
Software Engineering Student & Developer

[![Portfolio](https://img.shields.io/badge/Portfolio-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white)](https://hadi-portfolio-view.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Abdul-Hadi-del)

---

### ⭐ If you liked this project, consider giving it a star!

</div>

## 📄 License

This project is open for personal reference. Feel free to explore the code.