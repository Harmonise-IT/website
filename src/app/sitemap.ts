import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harmonise.nl'

    // List your public routes here. Add/remove as you create pages.
    const routes = ['', '/contact', '/wat-wij-doen', '/wie-wij-zijn']

    const now = new Date()
    return routes.map((path) => ({
        url: `${base}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.7,
    }))
}
