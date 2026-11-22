// Wraps every Markdown table in <div class="table-wrap"> so wide tables can
// use the full page width and only scroll sideways on small screens.
export default function rehypeWrapTables() {
  const visit = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrap'] },
          children: [child],
        };
      }
      visit(child);
      return child;
    });
  };
  return (tree) => visit(tree);
}
