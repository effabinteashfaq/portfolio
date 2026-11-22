// @ts-check
import { defineConfig } from 'astro/config';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables.mjs';

export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },
});
