// Swaps each ```mermaid code block for its saved drawing in src/mermaid/<hash>.svg
// (drawn by scripts/render-mermaid.mjs). Screen readers get a text summary built
// from the diagram's labels. If a drawing is missing, the code block is left as is.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const hashOf = (src) => createHash('sha256').update(src.trim()).digest('hex').slice(0, 16);
const textOf = (node) => (node.type === 'text' ? node.value : (node.children || []).map(textOf).join(''));
const clean = (s) => s
  .replace(/<\/b>\s*(<br\s*\/?>)?/gi, ': ')   // "<b>Title</b><br/>text" reads "Title: text"
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

// "Diagram: Access control (One policy...) leads to ISO/IEC 27001:2022 (...), ..."
const describe = (src) => {
  const labels = {};
  // quoted labels first (they may contain brackets), then plain ones
  for (const m of src.matchAll(/(\w+)\s*[\[\(\{]+\s*"([^"]+)"\s*[\]\)\}]+/g)) labels[m[1]] = clean(m[2]);
  for (const m of src.matchAll(/(\w+)\s*[\[\(\{]+([^"\]\)\}]+)[\]\)\}]+/g)) labels[m[1]] ||= clean(m[2]);
  const edges = [...src.matchAll(/(\w+)\s*-+>+\s*(\w+)/g)].map((m) => [m[1], m[2]]);
  if (!edges.length) return 'Diagram: ' + Object.values(labels).join('; ');
  const from = {};
  for (const [a, b] of edges) (from[a] ||= []).push(labels[b] || b);
  return 'Diagram: ' + Object.entries(from).map(([a, bs]) => `${labels[a] || a} leads to ${bs.join('; ')}`).join('. ') + '.';
};

export default function rehypeMermaidCache() {
  const visit = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'pre') {
        const code = child.children?.find((c) => c.type === 'element' && c.tagName === 'code');
        const cls = code?.properties?.className || [];
        if (code && cls.includes('language-mermaid')) {
          const src = textOf(code);
          const file = `src/mermaid/${hashOf(src)}.svg`;
          if (existsSync(file)) {
            const svg = readFileSync(file, 'utf8').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
            return {
              type: 'element',
              tagName: 'figure',
              // focusable: on phones the drawing keeps a readable size and swipes sideways
              properties: { className: ['diagram'], role: 'img', ariaLabel: describe(src), tabIndex: 0 },
              children: [{ type: 'raw', value: svg }],
            };
          }
        }
      }
      visit(child);
      return child;
    });
  };
  return (tree) => visit(tree);
}
