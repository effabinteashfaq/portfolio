// Copies files from assets/ into public/ so the site can serve them.
// assets/ stays the single source of truth; public/cv is generated.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';

const cv = 'public/cv/Effa_binte_Ashfaq_CV.pdf';
await mkdir('public/cv', { recursive: true });
await rm(cv, { force: true });
// read + write (not copyFile) so the copy is a normal, replaceable file
await writeFile(cv, await readFile('assets/cv/Effa_binte_Ashfaq_CV.pdf'), { mode: 0o644 });
console.log('assets ready: CV copied to public/cv/');
