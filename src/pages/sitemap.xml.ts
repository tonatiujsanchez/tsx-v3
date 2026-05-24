import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { siteConfig } from '@data/site'

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects')

  const urls = [
    `  <url><loc>${siteConfig.url}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`,
    ...projects.map(
      (p) =>
        `  <url><loc>${siteConfig.url}/projects/${p.id}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
