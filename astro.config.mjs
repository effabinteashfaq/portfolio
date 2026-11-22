// @ts-check
import { defineConfig } from 'astro/config';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables.mjs';
import rehypeMermaidCache from './src/plugins/rehype-mermaid-cache.mjs';

export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  markdown: {
    // mermaid blocks are swapped for saved drawings, so don't colour them as code
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    rehypePlugins: [rehypeWrapTables, rehypeMermaidCache],
  },
});
