// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

const BASE_URL = '/';

// rehype plugin to rewrite image paths with BASE_URL
function rehypeRewriteImageUrls() {
  return (tree) => {
    const baseWithoutTrailingSlash = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    
    // only rewrite if base is not just "/"
    if (baseWithoutTrailingSlash === '') {
      return;
    }
    
    // walk through AST and find img nodes
    const walkNode = (node) => {
      if (node.type === 'element' && node.tagName === 'img' && node.properties.src) {
        const src = node.properties.src;
        // only rewrite if it's an absolute path starting with /
        if (typeof src === 'string' && src.startsWith('/')) {
          node.properties.src = `${baseWithoutTrailingSlash}${src}`;
        }
      }
      
      if (node.children) {
        node.children.forEach(walkNode);
      }
    };
    
    walkNode(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://uav.studentorg.berkeley.edu",
  base: BASE_URL,

  markdown: {
    rehypePlugins: [rehypeRewriteImageUrls]
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});