// Draws every ```mermaid diagram in the writeups as an SVG file in src/mermaid/,
// using the Chrome on this computer. The site build then uses these saved
// drawings, so the live site ships no diagram JavaScript and Vercel needs no browser.
// Runs automatically before `npm run dev` / `npm run build`. If Chrome isn't
// available (for example on Vercel), it skips quietly and the saved files are used.
import { spawn, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const hashOf = (src) => createHash('sha256').update(src.trim()).digest('hex').slice(0, 16);

const OUT = 'src/mermaid';
mkdirSync(OUT, { recursive: true });

// 1. collect diagrams that haven't been drawn yet
const blocks = [];
for (const f of readdirSync('src/content/writeups').filter((f) => f.endsWith('.md'))) {
  const md = readFileSync(join('src/content/writeups', f), 'utf8');
  for (const m of md.matchAll(/^```mermaid[ \t]*\n([\s\S]*?)^```[ \t]*$/gm)) {
    const src = m[1].trim();
    const hash = hashOf(src);
    if (!existsSync(join(OUT, `${hash}.svg`))) blocks.push({ src, hash, file: f });
  }
}
if (!blocks.length) { console.log('mermaid: all diagrams already drawn'); process.exit(0); }

// 2. find Chrome
const chromePath = ['google-chrome', 'chromium', 'chromium-browser']
  .map((c) => { try { return execSync(`command -v ${c}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; } })
  .find(Boolean);
if (!chromePath) {
  console.warn(`mermaid: ${blocks.length} diagram(s) not drawn yet and no Chrome here; they will show as code until drawn locally.`);
  process.exit(0);
}

// 3. draw them in headless Chrome, with the site's Karla font loaded so boxes fit the text
const profile = mkdtempSync(join(tmpdir(), 'mermaid-'));
const port = 9400 + Math.floor(Math.random() * 300);
const chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let target;
  for (let i = 0; i < 60 && !target; i++) { await sleep(200); try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {} }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text);
    return r.result.result.value;
  };
  await send('Runtime.enable');

  const font = (w) => readFileSync(`node_modules/@fontsource/karla/files/karla-latin-${w}-normal.woff2`).toString('base64');
  await evaluate(`(async () => {
    const add = (w, b64) => { const f = new FontFace('Karla', 'url(data:font/woff2;base64,' + b64 + ')', { weight: String(w) }); document.fonts.add(f); return f.load(); };
    await add(400, ${JSON.stringify(font(400))});
    await add(700, ${JSON.stringify(font(700))});
    return true;
  })()`);
  await evaluate(readFileSync('node_modules/mermaid/dist/mermaid.min.js', 'utf8') + ';true');

  // colours from the site palette; nodes cycle through palette borders
  const palette = ['#2F5D50', '#B5562F', '#3B4F7D', '#A94C6B', '#8A6512', '#3A735F'];
  const themeCSS = palette.map((c, i) => `.nodes > .node:nth-child(${palette.length}n+${i + 1}) rect { stroke: ${c}; }`).join(' ')
    + ' .node rect { stroke-width: 2px; rx: 10px; ry: 10px; } .nodeLabel b { color: #1F2A44; }';
  const config = {
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: 'Karla, sans-serif',
    themeVariables: {
      fontFamily: 'Karla, sans-serif', fontSize: '15px',
      primaryColor: '#FBF7EE', primaryBorderColor: '#2F5D50', primaryTextColor: '#1F2A44',
      lineColor: '#B5562F', background: '#FBF6EC',
    },
    flowchart: { htmlLabels: true, curve: 'basis', padding: 16, nodeSpacing: 26, rankSpacing: 80, wrappingWidth: 420 },
    markdownAutoWrap: false,
    themeCSS,
  };
  await evaluate(`mermaid.initialize(${JSON.stringify(config)}); true`);

  for (const b of blocks) {
    const svg = await evaluate(`mermaid.render(${JSON.stringify('mmd-' + b.hash)}, ${JSON.stringify(b.src)}).then(r => r.svg)`);
    writeFileSync(join(OUT, `${b.hash}.svg`), svg);
    console.log(`mermaid: drew ${b.file} → src/mermaid/${b.hash}.svg`);
  }
  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
