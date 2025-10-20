// app/layout.tsx
import type { Metadata } from 'next'
import './styles/globals.scss'
import Navbar from '@/app/components/Navbar'
import { Montserrat } from 'next/font/google'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
    metadataBase: new URL('https://test.harmonise.nl'),
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
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Harmonise IT',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Harmonise IT',
        description: 'Grip op uw digitale landschap.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/favicon.ico',
    },
    robots: { index: true, follow: true },
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
