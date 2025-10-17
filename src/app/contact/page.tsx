// NO 'use client' here
import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
    title: 'Harmonise IT | Contact',
    description: 'Contact pagina.',
}

export default function ContactPage() {
    return <ContactClient />
}
