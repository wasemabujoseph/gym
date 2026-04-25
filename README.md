# Abu Fowzan Fitness

A polished Arabic/English fitness program and workout tracker built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

## Features

- Arabic-first interface with English language support
- Light and dark theme support
- Workout program dashboard
- Exercise library with equipment variations
- Set completion tracking
- Weight and repetition logging
- Personal records
- Water intake tracker
- Recovery day guidance
- Local browser storage, so no backend is required
- Fully static build, ready for GitHub Pages

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui style components
- Radix UI primitives
- Lucide icons

## Requirements

Install Node.js 20 or newer.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

## Build for Production

```bash
npm run build
```

The production files will be generated in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Deploy on GitHub Pages

This repository already includes a GitHub Actions workflow at:

```text
.github/workflows/deploy.yml
```

To host it on GitHub Pages:

1. Create a new GitHub repository.
2. Upload or push all project files to the repository.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Push to the `main` branch.
6. GitHub Actions will build the app and publish the `dist` folder automatically.

The app uses `base: './'` in `vite.config.ts`, which makes assets work correctly on GitHub Pages even when the repository name changes.

## Manual Git Commands

Replace the repository URL with your real GitHub repository URL.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/abu-fowzan-fitness.git
git push -u origin main
```

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/ui/
│   ├── data/workoutData.ts
│   ├── hooks/
│   └── lib/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Notes

- User progress is saved in `localStorage` in the visitor's browser.
- No database, server, or API keys are required.
- To reset saved progress, clear the browser site data for the hosted URL.
