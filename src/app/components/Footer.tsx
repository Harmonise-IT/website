// components/Footer.tsx
import Link from 'next/link'
import styles from './Footer.module.scss'
import Image from 'next/image'

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
    {
        // <Link href={`mailto:${email}`}>{email}</Link>

        title: 'Contact',
        links: [
            { href: 'mailto:info@harmonise.nl', label: 'Mail: info@harmonise.nl' },
            { href: 'tel:+31645540216', label: 'Telefoon: +31 645540216' },
        ],
    },
    {
        title: 'Wat wij doen',
        links: [
            { href: '/strategie-en-advies#strategie', label: 'Strategie' },
            { href: '/strategie-en-advies#inrichting', label: 'Inrichting' },
            { href: '/tech#software-op-maat', label: 'Software op maat' },
            { href: '/tech#integraties', label: 'Integraties' },
        ],
    },
    {
        title: 'Wie wij zijn',
        links: [
            { href: '/wie-wij-zijn', label: 'Over Harmonise IT' },
            { href: '/wie-wij-zijn#onze-visie', label: 'Onze visie' },
            { href: '/wie-wij-zijn#locatie', label: 'Locatie' },
        ],
    },
    // {
    //     title: 'Follow',
    //     links: [
    //         { href: '#linkedin', label: 'LinkedIn' },
    //         { href: 'https://github.com/Harmonise-IT', label: 'GitHub' },
    //     ],
    // },
]

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.divider}/>

            <div className="container">
                <div className={styles.lead}>
                    <Link href="/" className={styles.brand}>
                        <Image
                            className={styles.heroLogo}
                            src="/hit-logo-white-transparent.png"
                            width={64}
                            height={64}
                            alt="Harmonise IT logo"
                        />
                    </Link>
                    <span>Harmonise IT</span>
                </div>

                <div className={styles.grid}>
                    {COLUMNS.map((col) => (
                        <div key={col.title} className={styles.col}>
                            <div className={styles.colTitle}>{col.title}</div>
                            <ul className={styles.linkList}>
                                {col.links.map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href}>{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <div className={styles.bottomRow}>
                        <div className={styles.copy}>© {new Date().getFullYear()} Harmonise IT</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
