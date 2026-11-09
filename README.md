# Out of the Margins — Art by Anna

A React + Vite + TypeScript art-portfolio starter built with Anna's actual uploaded artwork. **No backend or hosting configuration required.**

## Start locally

Requires Node.js 20.19+ or 22.12+ (Vite 7).

```powershell
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Do **not** double-click `index.html`; this is a React application and needs the Vite dev server.

For a deployable build:

```powershell
npm run build
npm run preview
```

## What's included

- **Home**: original sketchbook-inspired hero with playful floating drawings and a scroll-controlled paper-to-color reveal.
- **The Work**: artwork gallery with category filters and click-to-enlarge lightbox.
- **About**: provisional introduction and an expressive mixed-art layout.
- **Responsive styles**, keyboard-focus styles, Escape-to-close lightbox, and reduced-motion accommodations.
- Working titles and bio are **placeholders**, not Anna's approved titles or statements.

## Swapping in your new transparent images

Put the processed PNGs in `public/sketches/`. Open `src/content.ts` and update `doodles` to the new filenames. For instance:

```ts
gown: '/sketches/Sketchbook_BallroomGownWomanCutout_transparent.png',
```

Note: transparent **line art** keeps only ink, so enclosed white spaces also become transparent. If you prefer paper/white fills on some characters, keep those as alternate assets and choose per scene.

You can add new paintings to `public/art/` and to the `art` array in `src/content.ts`. Set `featured: true` for home-page features; categories control the gallery filters.

## Before public release

- Confirm artwork titles, biography, descriptions, and alt text with Anna.
- Add her contact method in `src/content.ts` (currently blank on purpose).
- Review the illustration crop/hover effects on your own screen, particularly mobile.
- Check image rights/consent for any artwork whose subject or collaborators require it.
- The layout is a foundation: no accounts, shopping cart, payments, or CMS.

## Project structure

```
src/App.tsx        Layout and views
src/content.ts    All artwork data, artist copy, and doodle paths
src/styles.css    Visual system, animation, responsive styling
public/art/       Artwork assets (optimized copies)
public/sketches/  Transparent sketch illustration assets
```
