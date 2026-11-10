# Out of the Margins — V7 Homepage Art Direction Update

**Applies on top of V6.** This is a small drop-in patch, not an entire replacement website. None of the existing artwork, sketchbook page, gallery, or Meet Anna files are replaced.

1. Extract this ZIP at the project root (where package.json is).
2. Allow the existing files in src/ to be replaced. New colored characters go under public/home-characters/.
3. Run `npm run build`, then `npm run dev` to inspect.
4. When happy, commit/deploy in your usual workflow.

Homepage changes:
- Painted-paper reveal: yellow shoe seedling above title; enlarged pink heart/eye upper right; apricot guitar woman lower right; ivory snail with little blue mosquito lower left. Old hot dog and extra right-hand doodles removed.
- Featured gallery teaser: flying blue cat drawn inward; yellow bird lower left; orange paper-hat boy looking up from lower right; no repeated boot.
- Sketchbook teaser: giant faint 'You Can Do It' drawing from left and smoking alien guy from right, behind the framed artwork; angry bee and badass lab mouse together toward bottom left; no duplicate heart/eye.
- Ending: only the pink waving girl on left, no monster and no bird. The angel snake remains on the reserve list.
- Minor cleanup: removes unused `doodles` import in App.tsx and retains the bee on narrow screens.

**Unchanged:** Full-page book images, interactive reader, gallery/lightbox, Meet Anna, other art files.

Verification: TypeScript transpile syntax check, PostCSS parsing, and presence check for all referenced art assets. Full npm build cannot run here because dependencies are not installed in this environment.
