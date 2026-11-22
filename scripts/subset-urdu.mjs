// Builds a tiny Noto Nastaliq Urdu font containing only the letters used on the
// site (the full font is ~160 KB; this keeps only what the Urdu words need,
// including Nastaliq's joined letter shapes). Re-run after adding Urdu text:
//   npm run subset-urdu
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import subsetFont from 'subset-font';

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk('src').filter((f) => /\.(astro|ya?ml|md|mdx|js|ts)$/.test(f));
let text = '';
for (const f of files) {
  const m = readFileSync(f, 'utf8').match(/[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿‌‍]+/g);
  if (m) text += m.join(' ') + ' ';
}
const chars = [...new Set(text.replace(/\s+/g, ''))].join('');
const src = readFileSync('node_modules/@fontsource/noto-nastaliq-urdu/files/noto-nastaliq-urdu-arabic-400-normal.woff2');
// keep spaces, common punctuation and joiners too
const out = await subsetFont(src, chars + ' ·‌‍', { targetFormat: 'woff2' });
writeFileSync('public/fonts/noto-nastaliq-urdu-subset.woff2', out);
console.log(`urdu font: ${chars.length} letters kept, ${(src.length / 1024).toFixed(0)} KB -> ${(out.length / 1024).toFixed(1)} KB`);
