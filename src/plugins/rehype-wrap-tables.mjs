// Wraps every Markdown table in <div class="table-wrap"> so wide tables can use
// the full page width and only scroll sideways on small screens. The wrapper is
// focusable (keyboard users can scroll it) and named after the table's columns.
const textOf = (node) => (node.type === 'text' ? node.value : (node.children || []).map(textOf).join(''));
const findAll = (node, tag, out = []) => {
  if (node.type === 'element' && node.tagName === tag) out.push(node);
  (node.children || []).forEach((c) => findAll(c, tag, out));
  return out;
};

export default function rehypeWrapTables() {
  const visit = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        const heads = findAll(child, 'th').map((th) => textOf(th).trim()).filter(Boolean);
        const label = heads.length ? `Table: ${heads.join(', ')}` : 'Table';
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrap'], tabIndex: 0, role: 'region', ariaLabel: label },
          children: [child],
        };
      }
      visit(child);
      return child;
    });
  };
  return (tree) => visit(tree);
}
