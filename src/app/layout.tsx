// app/layout.tsx

export const dynamic = 'force-static' // Suggested fix against full page crash
export const revalidate = false       // Suggested fix against full page crash

import type { Metadata, Viewport } from 'next'
import './styles/globals.scss'
import Navbar from '@/app/components/Navbar'
import { Montserrat } from 'next/font/google'
import Footer from '@/app/components/Footer'

const SITE = 'https://harmonise.nl'
const OG = `${SITE}/og-image.jpg`

export const metadata: Metadata = {
    metadataBase: new URL(SITE),

    title: {
        default: 'Harmonise IT',
        template: '%s | Harmonise IT',
    },
    description: 'Beleid en technologie in harmonie',
    alternates: { canonical: SITE },

    openGraph: {
        type: 'website',
        url: SITE,
        siteName: 'Harmonise IT',
        title: 'Harmonise IT',
        description: 'Beleid en technologie in harmonie',
        images: [
            { url: OG, width: 1200, height: 630, alt: 'Harmonise IT' },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Harmonise IT',
        description: 'Beleid en technologie in harmonie',
        images: [OG],
    },

    manifest: '/site.webmanifest',

    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        other: [
            { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0B1B34" }, // brand navy for Safari pinned tabs
        ],
        shortcut: ["/favicon.ico"],
    },

    robots: { index: true, follow: true },

    appleWebApp: {
        capable: true,
        title: 'Harmonise IT',
        statusBarStyle: 'black-translucent',
    },
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0F1F33" },
    ],
}

const font = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'Arial'],
    adjustFontFallback: true
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={font.className}>
        <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}
