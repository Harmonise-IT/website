'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'

type MenuKey = 'wat-wij-doen' | 'wie-wij-zijn' | null

const links = [
    { key: 'wat-wij-doen' as const, label: 'Wat wij doen', menu: true },
    { key: 'wie-wij-zijn' as const, label: 'Wie wij zijn', menu: true },
]

const mobileLinks = [
    { key: 'mobile-strategie' as const, label: 'Strategie', href: '/strategie-en-advies#strategie' },
    { key: 'mobile-inrichting' as const, label: 'Inrichting', href: '/strategie-en-advies#inrichting' },
    { key: 'mobile-software-op-maat' as const, label: 'Software op maat', href: '/tech#software-op-maat' },
    { key: 'mobile-oplossingen', label: 'Oplossingen', href: '/tech#oplossingen' },
]

export default function Navbar() {
    const [hovering, setHovering] = useState(false)      // desktop hover
    const [open, setOpen] = useState<MenuKey>(null)      // desktop dropdown
    const [mobileOpen, setMobileOpen] = useState(false)  // mobile panel
    const [scrolled, setScrolled] = useState(false)      // solid on scroll
    const leaveTimer = useRef<number | null>(null)

    // Esc to close panels
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setOpen(null); setMobileOpen(false) }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // Lock page scroll when mobile nav is open
    useEffect(() => {
        document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.documentElement.style.overflow = '' }
    }, [mobileOpen])

    // Solid background after small scroll threshold
    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 40)
        update() // set initial state on mount (if landing mid-page)
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])

    const handleEnterBar = () => {
        if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
        setHovering(true)
    }
    const handleLeaveBar = () => {
        leaveTimer.current = window.setTimeout(() => {
            setHovering(false)
            setOpen(null)
        }, 120) as unknown as number
    }

    const barActive = hovering || open || mobileOpen

    return (
        <header
            className={[
                styles.header,
                barActive ? styles.isHovering : '',
                scrolled && ! mobileOpen ? styles.isScrolled : '', // 👈 add solid on scroll
            ].join(' ')}
            onMouseEnter={handleEnterBar}
            onMouseLeave={handleLeaveBar}
        >
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.brand}>
                        <Image
                            className={styles.heroLogo}
                            src="/hit-logo-blue-transparent.png"
                            width={64}
                            height={64}
                            alt="Harmonise IT logo"
                        />
                        Harmonise IT
                    </Link>

                    {/* Desktop links */}
                    <ul className={styles.links}>
                        {links.map(item => (
                            <li
                                key={item.key}
                                className={`${styles.linkWrap} ${open === item.key ? styles.active : ''}`}
                                onMouseEnter={() => { setOpen(item.key); setHovering(true) }}
                                onFocus={() => { setOpen(item.key); setHovering(true) }}
                            >
                                <button
                                    className={styles.linkItem}
                                    aria-haspopup="true"
                                    aria-expanded={open === item.key}
                                >
                                    {item.label}
                                    <span className={styles.chev} aria-hidden>▾</span>
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={`${styles.menuPanel} ${open === item.key ? styles.open : ''}`}
                                    role="menu"
                                >
                                    {item.key === 'wat-wij-doen' && <ProductsMenu />}
                                    {item.key === 'wie-wij-zijn' && <ResourcesMenu />}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.cta}>Contact</Link>

                        {/* Mobile hamburger */}
                        <button
                            className={styles.burger}
                            aria-label="Menu"
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen(v => !v)}
                        >
                            <span />
                            <span />
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile slide-down panel */}
            <div className={`${styles.panel} ${mobileOpen ? styles.panelOpen : ''}`}>
                <div className="container">
                    <ul className={styles.panelList}>
                        <li className={styles.panelTitle}>Navigatie</li>
                        {mobileLinks.map(l => (
                            <li key={l.key}>
                                <Link href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</Link>
                            </li>
                            // <li key={l.key}>
                            //     {/* Top-level categories in mobile; close panel on click */}
                            //     <Link href="#" onClick={() => setMobileOpen(false)}>{l.label}</Link>
                            // </li>
                        ))}
                        <li className={styles.panelCta}>
                            <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

/* --- Menus --- */
function ProductsMenu() {
    return (
        <div className={styles.menuGrid}>
            <Column title="Strategie en advies" href="/strategie-en-advies">
                <a href="/strategie-en-advies#strategie">Strategie</a>
                <a href="/strategie-en-advies#inrichting">Inrichting</a>
            </Column>
            <Column title="Tech" href="/tech">
                <a href="/tech#software-op-maat">Software op maat</a>
                <a href="/tech#oplossingen">Oplossingen</a>
                {/*<a href="/tech#software-risk-assessment">Software risk assessment</a>*/}
            </Column>
            <Column title="Ondersteuning" href="/ondersteuning">
                <a href="/ondersteuning#on-site">On site</a>
                <a href="/ondersteuning#platform-migratie">Platform migratie</a>
                <a href="/ondersteuning#cloud">Cloud</a>
            </Column>
            <Aside
                title="Voor gemeenten in 2026"
                blurb="Commitment Common Ground VNG. Wmebv per 1 januari. Uitvoering Omgevingswet, DSO."
                link={{ href: '/contact', label: 'Boek Quick Scan' }}
            />
        </div>
    )
}

function ResourcesMenu() {
    return (
        <div className={styles.menuGrid}>
            <Column title="Onze missie" href="/onze-missie">
                <a href="/onze-missie#onze-waarden">Onze waarden</a>
                <a href="/onze-missie#uitgangspunten">Uitgangspunten</a>
                <a href="/onze-missie#waarom-harmonise-it">Waarom Harmonise IT</a>
            </Column>
            <Column title="Bedrijf" href="/bedrijf">
                <a href="/bedrijf#het-team">Het team</a>
                <a href="/bedrijf#privacy-statement">Privacy statement</a>
                <a href="/contact">Contact</a>
            </Column>
            <Aside
                title="Even sparren?"
                blurb="Wij zijn beschikbaar."
                link={{ href: '/contact', label: 'Bel nu' }}
            />
        </div>
    )
}

function Column({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
    return (
        <div className={styles.col}>
            <a href={href} className={styles.colTitleLink}>
                {title}
            </a>
            <div className={styles.colList}>{children}</div>
        </div>
    )
}

function Aside({ title, blurb, link }:{
    title:string; blurb:string; link?:{href:string;label:string}
}) {
    return (
        <div className={styles.aside}>
            <div className={styles.asideTitle}>{title}</div>
            <p className={styles.asideBlurb}>{blurb}</p>
            {link && <Link href={link.href} className={styles.asideCta}>{link.label}</Link>}
        </div>
    )
}
