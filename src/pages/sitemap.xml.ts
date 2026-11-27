import type { APIRoute } from 'astro';
import { blogPosts } from '../data/blogPosts';

// Builds /sitemap.xml from the real pages, so it never goes out of date.
const SITE = 'https://www.ironhealthsolutions.com';

// Pages that should not be listed (test copies)
const SKIP = new Set(['/home-2/', '/404/']);

const pageFiles = import.meta.glob('./**/*.astro');

const staticPaths = Object.keys(pageFiles)
  .filter((f) => !f.includes('['))
  .map((f) => {
    const p = f.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, '');
    return p === '' ? '/' : `${p}/`;
  })
  .filter((p) => !SKIP.has(p));

const entries = [
  ...staticPaths.map((p) => ({ loc: `${SITE}${p}`, lastmod: '' })),
  ...blogPosts.map((post) => ({ loc: `${SITE}${post.href}`, lastmod: post.published.slice(0, 10) })),
].sort((a, b) => a.loc.localeCompare(b.loc));

export const GET: APIRoute = () => {
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
