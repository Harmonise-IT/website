// app/layout.tsx

export const dynamic = 'force-static' // Suggested fix against full page crash
export const revalidate = false       // Suggested fix against full page crash

import type { Metadata, Viewport } from 'next'
import './styles/globals.scss'
import Navbar from '@/app/components/Navbar'
import { Montserrat } from 'next/font/google'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
    metadataBase: new URL('https://harmonise.nl'),
    title: {
        default: 'Harmonise IT',
        template: '%s | Harmonise IT',
    },
    description: 'Grip op uw digitale landschap.',
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        url: '/',
        siteName: 'Harmonise IT',
        title: 'Harmonise IT',
        description: 'Grip op uw digitale landschap.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Harmonise IT' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Harmonise IT',
        description: 'Grip op uw digitale landschap.',
        images: ['/og-image.png'],
    },

    manifest: '/site.webmanifest',

    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        shortcut: ['/favicon.ico'],
    },

    robots: { index: true, follow: true },

    appleWebApp: {
        capable: true,
        title: 'Harmonise IT',
        statusBarStyle: 'black-translucent',
    },
}

export const viewport: Viewport = {
    themeColor: '#1E2535',
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
