// @ts-check
import { defineConfig } from 'astro/config';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables.mjs';
import rehypeMermaidCache from './src/plugins/rehype-mermaid-cache.mjs';

export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  vite: {
    build: {
      // keep scripts as separate files (never inlined into the page), so the
      // Content-Security-Policy can allow scripts from this site only
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    // mermaid blocks are swapped for saved drawings, so don't colour them as code
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    rehypePlugins: [rehypeWrapTables, rehypeMermaidCache],
  },
});
