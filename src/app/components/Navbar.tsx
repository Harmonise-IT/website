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

export default function Navbar() {
    const [hovering, setHovering] = useState(false)       // desktop hover
    const [open, setOpen] = useState<MenuKey>(null)       // desktop panel
    const [mobileOpen, setMobileOpen] = useState(false)   // mobile panel
    const leaveTimer = useRef<number | null>(null)

    // close with Esc
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setOpen(null); setMobileOpen(false) }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // lock scroll when the mobile menu is open
    useEffect(() => {
        document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.documentElement.style.overflow = '' }
    }, [mobileOpen])

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
            className={`${styles.header} ${barActive ? styles.isHovering : ''}`}
            onMouseEnter={handleEnterBar}
            onMouseLeave={handleLeaveBar}
        >
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.brand}>
                        <Image
                            className={styles.heroLogo}
                            src="/hit-logo-transparent.png"
                            width={36}
                            height={36}
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
                        {links.map(l => (
                            <li key={l.key}>
                                <Link href="#" onClick={() => setMobileOpen(false)}>{l.label}</Link>
                            </li>
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

/* --- Menus (unchanged) --- */
function ProductsMenu() {
    return (
        <div className={styles.menuGrid}>
            <Column title="Strategie en advies">
                <a href="/services#web">Quick scan</a>
                <a href="/services#templates">Samen op weg</a>
                <a href="/services#templates">Procesregie</a>
            </Column>
            <Column title="Tech">
                <a href="/services#cloud">Software op maat</a>
                <a href="/services#data">Oplossingen</a>
                <a href="/services#analytics">Software risk assessment</a>
            </Column>
            <Column title="Ondersteuning">
                <a href="/services#delivery">On site</a>
                <a href="/services#advisory">Platform migratie</a>
                <a href="/services#cloud">Cloud</a>
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
            <Column title="Onze missie">
                <a href="/resources/guides">Onze waarden</a>
                <a href="/resources/checklists">Uitgangspunten</a>
                <a href="/resources/case-studies">Waarom Harmonise IT</a>
            </Column>
            <Column title="Bedrijf">
                <a href="/about">Het team</a>
                <a href="/privacy">Privacy statement</a>
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

function Column({ title, children }:{ title:string; children: React.ReactNode }) {
    return (
        <div className={styles.col}>
            <div className={styles.colTitle}>{title}</div>
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
