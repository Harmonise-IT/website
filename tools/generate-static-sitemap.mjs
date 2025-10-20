import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const BASE_URL = process.env.SITE_URL || 'https://test.harmonise.nl'
const OUT_DIR = resolve('out')

// Recursively collect exported HTML files
function walk(dir) {
    const entries = readdirSync(dir, { withFileTypes: true })
    const files = []
    for (const e of entries) {
        const p = join(dir, e.name)
        if (e.isDirectory()) files.push(...walk(p))
        else if (e.isFile() && (e.name === 'index.html' || e.name.endsWith('.html'))) {
            files.push(p)
        }
    }
    return files
}

const files = walk(OUT_DIR)

// Convert file path -> URL path
function toPath(file) {
    let rel = file.replace(OUT_DIR, '') // remove leading out dir
    rel = rel.replace(/\\/g, '/')       // windows safety
    // /about/index.html -> /about, /contact.html -> /contact
    rel = rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
    if (!rel.startsWith('/')) rel = '/' + rel
    return rel
}

// Exclude special/utility routes
const EXCLUDE = new Set([
    '/404', '/500', '/_not-found', '/favicon.ico', '/robots.txt', '/sitemap.xml'
])

const urls = [...new Set(files.map(toPath))].filter(u => !EXCLUDE.has(u))

const now = new Date().toISOString()
const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>
    <loc>${BASE_URL}${u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : '0.7'}</priority>
  </url>`).join('\n') +
    `\n</urlset>\n`

writeFileSync(join(OUT_DIR, 'sitemap.xml'), xml, 'utf8')

const robots =
    `User-agent: *\n` +
    `Allow: /\n` +
    `Sitemap: ${BASE_URL}/sitemap.xml\n`
writeFileSync(join(OUT_DIR, 'robots.txt'), robots, 'utf8')

console.log(`Generated sitemap.xml with ${urls.length} URLs and robots.txt in ${OUT_DIR}`)
