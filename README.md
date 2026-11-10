# Out of the Margins — Art by Anna (V6)

A React + Vite + TypeScript portfolio featuring Anna's original artwork.

## Install V6 over your V5 checkout

Extract this ZIP into your existing Out of the Margins project folder and allow files to be overwritten. Keep your existing Git repository (`.git/` is not included). The ZIP includes all source files and the current artwork assets, so it can also serve as a standalone source checkout after installing npm dependencies.

```powershell
npm install
npm run build
npm run dev
```

Open the local URL printed by Vite; commit/push only after reviewing the site. No automatic GitHub/Render changes are made.

## V6 changes

- **The Work:** 29 gallery entries, including the newly added **Bad Girls Don't Cry** painting (converted to browser-friendly WebP from Anna's original HEIC). All distinct gallery artworks from `AnnaPortfolioArt.zip` are included. Each card has an optimized thumbnail and an enlarged view. One UV artwork supports a **Blacklight / Daylight** image toggle. Working titles/descriptions may be changed later by Anna in `src/content.ts`.
- **Sketchbook:** all **23 cleaned `FullPage_` originals** from `FullPage_CompleteSet(2).zip` in `public/book/pages`. Reader preserves 3D page turns and scales each page with `object-fit: contain`, avoiding cut-off edges. The grid also includes all 56 extracted doodle characters. Image order is controlled by `src/sketchbookPages.ts`.
- **Meet Anna:** layered studio-wall cards, including the two photos of Anna working on art. Biography is placeholder text until Anna provides her own.
- **Home:** deliberate doodle placements, a larger framed sketchbook illustration, a visible sketchbook CTA, and colored drawings in the dark closing section.
- **Sketchbook detail gallery:** more separation between white drawings and the lavender wall; repetitive character captions removed.

## Asset provenance and notes

The supplied `.pdn` source file and duplicate horned-girl JPG are not displayed. The two photos of Anna working are on **Meet Anna**, not in the art grid. The converted HEIC file is included only as optimized WebP in `public/art/`; original files inside the uploaded ZIPs remain untouched.

The entire repository can be built locally with Node 22 and `npm run build`. This update passed an asset-reference and source-syntax check in the preparation environment, but **a full npm production build was not available there**. Please run the local build before committing.

No images or copy have been approved by Anna yet; working artwork titles and artist statement are provisional.
