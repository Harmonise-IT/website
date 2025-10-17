// app/layout.tsx
import type { Metadata } from 'next'
import './styles/globals.scss'
import Navbar from '@/app/components/Navbar'
import { Montserrat } from 'next/font/google'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
    title: 'Harmonise IT',
    description: 'Grip op uw digitale landschap.',
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
