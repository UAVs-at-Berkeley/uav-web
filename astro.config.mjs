// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

const BASE_URL = '/';

// https://astro.build/config
export default defineConfig({
  site: "https://uav.studentorg.berkeley.edu",
  base: BASE_URL,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});