# Lycée Technique d'Akono — Website

A bilingual (FR/EN) React site for LT Akono, built with [Vite](https://vitejs.dev).
Includes a light/dark theme toggle, a language switch, and the school's official
crest and departments.

## Project structure

```
lt-akono-react/
├── index.html          Vite entry HTML
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx         React root
│   ├── App.jsx           The whole site (single component)
│   ├── index.css          All styles
│   └── assets/
│       ├── logo.png              School crest
│       └── hero-assembly.jpg     Flag assembly photo (hero background)
```

## Run it locally

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
npm run dev
```

This starts a local dev server (usually at `http://localhost:5173`) with hot reload.

To build a production version:

```bash
npm run build
npm run preview   # preview the production build locally
```

The build output lands in `dist/`.

## Deploying to Vercel

You have two options — pick whichever you're more comfortable with.

### Option A: Deploy from GitHub (recommended, no terminal needed)

1. Create a new GitHub repository and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in (you can sign in with your
   GitHub account directly).
3. Click **Add New → Project**, then select the repository you just pushed.
4. Vercel auto-detects Vite projects — the default build settings
   (`npm run build`, output directory `dist`) are already correct, so you can
   just click **Deploy**.
5. After a minute or two, Vercel gives you a live URL like
   `https://lt-akono-site.vercel.app`. Every future push to `main` will
   redeploy automatically.

### Option B: Deploy from your terminal with the Vercel CLI

1. Install the CLI (one-time):
   ```bash
   npm install -g vercel
   ```
2. From inside this project folder, run:
   ```bash
   vercel
   ```
3. Follow the prompts (log in / sign up the first time, confirm the project
   name and settings — the defaults are fine).
4. Once it finishes, you'll get a live preview URL. To publish it as your
   main production URL, run:
   ```bash
   vercel --prod
   ```

### Custom domain

Once deployed, go to your project on vercel.com → **Settings → Domains** to
attach a custom domain (e.g. `ltakono.cm`) if the school has one.

## Editing content

- **Text (FR/EN):** each piece of bilingual text in `src/App.jsx` carries both
  a `data-fr` and a `data-en` attribute — edit both when you change wording.
- **Departments, news, contact info:** all directly in the JSX in `src/App.jsx`,
  organized by section (`#filieres`, `#actualites`, `#contact`, etc).
- **Colors/fonts/spacing:** all in `src/index.css`, using CSS variables defined
  at the top (`--ink`, `--paper`, `--accent`, etc.) for both light and dark mode.
- **Images:** replace the files in `src/assets/` with the same filenames, or
  update the `import logoUrl from "./assets/logo.png"` line in `App.jsx` and
  the background-image path in `index.css` if you rename them.
