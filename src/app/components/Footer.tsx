// components/Footer.tsx
import Link from 'next/link'
import styles from './Footer.module.scss'
import Image from 'next/image'

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
    {
        title: 'Products',
        links: [
            { href: '/services#web', label: 'Website Templates' },
            { href: '/services#domains', label: 'Domains' },
            { href: '/services#integrations', label: 'Integrations' },
            { href: '/services#analytics', label: 'Analytics' },
            { href: '/services#enterprise', label: 'Enterprise' },
        ],
    },
    {
        title: 'Solutions',
        links: [
            { href: '/case-studies', label: 'Customer Examples' },
            { href: '/services#cloud', label: 'Cloud Architecture' },
            { href: '/services#data', label: 'Data & BI' },
            { href: '/services#security', label: 'Security' },
            { href: '/services#advisory', label: 'Advisory' },
            { href: '/services#delivery', label: 'Delivery' },
        ],
    },
    {
        title: 'Support',
        links: [
            { href: '/support', label: 'Help Center' },
            { href: '/support#status', label: 'System Status' },
            { href: '/resources/guides', label: 'Guides' },
            { href: '/resources/webinars', label: 'Webinars' },
            { href: '/contact', label: 'Contact' },
        ],
    },
    {
        title: 'Company',
        links: [
            { href: '/about', label: 'About' },
            { href: '/about#careers', label: 'Careers' },
            { href: '/legal/privacy', label: 'Privacy' },
            { href: '/legal/terms', label: 'Terms' },
        ],
    },
    {
        title: 'Follow',
        links: [
            { href: 'https://linkedin.com', label: 'LinkedIn' },
            { href: 'https://x.com', label: 'X' },
            { href: 'https://github.com', label: 'GitHub' },
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
                        src="/hit-logo-transparent.png"
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
                        <div className={styles.locale}>
                            <button aria-label="Language" className={styles.pill}>English ▾</button>
                            <button aria-label="Currency" className={styles.pill}>€ EUR ▾</button>
                        </div>
                        <ul className={styles.legal}>
                            <li><Link href="/legal/terms">Terms</Link></li>
                            <li><Link href="/legal/privacy">Privacy</Link></li>
                            <li><Link href="/legal/security">Security</Link></li>
                            <li><Link href="/sitemap">Sitemap</Link></li>
                        </ul>
                        <div className={styles.copy}>© {new Date().getFullYear()} Harmonise IT</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
