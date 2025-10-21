import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const host = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harmonise.nl'
    return {
        rules: [{ userAgent: '*', allow: '/' }],
        sitemap: `${host}/sitemap.xml`,
        host,
    }
}
