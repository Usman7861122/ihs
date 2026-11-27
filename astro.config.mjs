import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Real domain: used for canonical links, the sitemap and social cards
  site: 'https://www.ironhealthsolutions.com',
  // Every page lives at /page/ (with the slash), so there is one address per page
  trailingSlash: 'always',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
