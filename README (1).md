<div align="center">

<img src="src/assets/brand-logo.png" alt="Sankalpa Creative Studio logo" width="250" />

# NEON ATELIER — Creative Developer Portfolio

**Designing ideas. Building experiences.**

A modern, interactive personal portfolio showcasing creative frontend development, thoughtful UI/UX design, and real-world projects.

[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

### [🌐 Live Portfolio](https://sana1211.github.io/sankalpa-sithmina-26/) · [💻 Source Code](https://github.com/sana1211/sankalpa-sithmina-26) · [🔗 LinkedIn](https://www.linkedin.com/in/sankalpa-sithmina)

</div>

---

## ✨ About the project

**NEON ATELIER** is my personal creative portfolio, designed to go beyond a conventional project gallery. It combines a cinematic navy-and-violet aesthetic with expressive motion, an interactive 3D ID card, responsive layouts, and a curated showcase of my work in web development, applications, and embedded systems.

I built it to express how I approach digital products: **clean design, meaningful interaction, and attention to detail.**

## 🚀 Key features

- **Interactive 3D ID card** — drag to move the hanging lanyard badge, release for natural motion, and click or tap to flip it.
- **Responsive by design** — layouts optimized for mobile, tablet, laptop, and desktop screens.
- **Cinematic visual experience** — a custom loading intro, smooth transitions, scroll reveals, and subtle micro-interactions.
- **Project showcase** — eight projects, organized with interactive category filters and detailed preview modals.
- **Education, skills & certificates** — dedicated sections to explore my experience, tools, and qualifications.
- **Contact experience** — an EmailJS-ready contact form with validation and an email-draft fallback when the service is not configured.
- **Accessibility considerations** — reduced-motion support and a non-WebGL fallback for the 3D card.
- **Automatic deployment** — GitHub Actions workflow for GitHub Pages.

## 🛠️ Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS 4, custom CSS |
| 3D experience | Three.js, React Three Fiber |
| Animation | Motion for React |
| Icons | Lucide React |
| Contact form | EmailJS |
| Deployment | GitHub Pages, GitHub Actions |

## 🗂️ Featured projects

| # | Project | Category |
| :--: | --- | --- |
| 01 | **Lanka Odyssey** — premium Sri Lanka travel experience | Web Development |
| 02 | **Premium Coffee Shop Website** — interactive coffee-shop experience | Web Development |
| 03 | **Wedding Gallery Celebration Story** — celebration and memories website | Web Development |
| 04 | **Wedding Invitation Website** — elegant digital wedding invitation | Web Development |
| 05 | **Automatic Plant Watering System** — Arduino-based smart irrigation | IoT & Embedded Systems |
| 06 | **Wallpaper Download Gallery** — curated wallpaper browsing | Web Applications |
| 07 | **E-Passport Sri Lanka** — digital passport service portal prototype | Web Applications |
| 08 | **Employee Management System** — employee administration desktop app | Desktop Applications |

Explore the projects, technologies, and available demo/source links in the [**live portfolio**](https://sana1211.github.io/sankalpa-sithmina-26/).

## 💻 Run locally

**Requirements:** Node.js 20.19+ or 22.12+ and npm.

```bash
# Clone the repository
git clone https://github.com/sana1211/sankalpa-sithmina-26.git

# Enter the project directory
cd sankalpa-sithmina-26

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173/`).

To create and test a production build:

```bash
npm run build
npm run preview
```

## ⚙️ Customization

| What to update | Location |
| --- | --- |
| Personal details, projects, education, skills & certificates | `src/data.ts` |
| Main layout and sections | `src/App.tsx`, `src/components/` |
| 3D badge interactions | `src/components/ThreeHeroStage.tsx` |
| ID card artwork | `src/assets/lanyard-front.png`, `src/assets/lanyard-back.png` |
| Theme & responsive styling | `src/styles.css`, `src/responsive.css` |
| Project screenshots | `public/projects/` |
| CV download | Update the CV file and `profile.resume` in `src/data.ts` |

**Note:** Some project screenshots, certificate files, and the CV may need to be supplied separately. Check asset paths before publishing changes.

### EmailJS (optional)

Create a `.env.local` file from `.env.example` and set your EmailJS public identifiers:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Configure the service and template in [EmailJS](https://www.emailjs.com/). Do **not** put private secrets in `VITE_` environment variables: Vite exposes these values to the browser. Without EmailJS configuration, the contact form can open an email draft instead.

## 🌍 Deploy to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push changes to the `main` branch.
2. Go to **Settings → Pages** in the GitHub repository.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Check the **Actions** tab for the build and deployment status.
5. Visit the [live site](https://sana1211.github.io/sankalpa-sithmina-26/) when deployment completes successfully.

Vite is configured with a relative base path so it can be hosted under a GitHub Pages repository URL.

## 👨‍💻 About me

I'm **Sankalpa Sithmina**, a frontend developer and UI/UX designer from Sri Lanka, currently pursuing a Bachelor of Information Technology (BIT). I enjoy turning ideas into responsive, visually engaging, and intuitive digital experiences.

- **Portfolio:** https://sana1211.github.io/sankalpa-sithmina-26/
- **GitHub:** https://github.com/sana1211
- **LinkedIn:** https://www.linkedin.com/in/sankalpa-sithmina
- **Email:** sankalpasithmina18@gmail.com

---

<div align="center">

**Designed & developed by Sankalpa Sithmina** 💜

*Crafted with creativity, code, and attention to detail.*

</div>
