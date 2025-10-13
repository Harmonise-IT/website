// components/Footer.tsx
import Link from 'next/link'
import styles from './Footer.module.scss'
import Image from 'next/image'

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
    {
        title: 'Contact',
        links: [
            { href: '#mail', label: 'Mail: info@harmonise.nl' },
            { href: '#phone', label: 'Telefoon: +31 645540216' },
        ],
    },
    {
        title: 'Wat wij doen',
        links: [
            { href: '#s&a', label: 'Strategie en advies' },
            { href: '#tech', label: 'Tech' },
            { href: '#ondersteuning', label: 'Ondersteuning' },
        ],
    },
    {
        title: 'Wie wij zijn',
        links: [
            { href: '#onze-missie', label: 'Onze missie' },
            { href: '#bedrijf', label: 'Bedrijf' },
        ],
    },
    {
        title: 'Follow',
        links: [
            { href: '#linkedin', label: 'LinkedIn' },
            { href: '#github', label: 'GitHub' },
        ],
    },
]

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.divider} />

            <div className="container">
                <div className={styles.lead}>
                    <Image
                        className={styles.heroLogo}
                        src="/hit-logo-blue-transparent.png"
                        width={64}
                        height={64}
                        alt="Harmonise IT logo"
                    />
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
