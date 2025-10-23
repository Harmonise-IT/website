// components/Features.tsx
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import s from './Features.module.scss'

type Item = {
    title: string
    body: string
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
    href: string
}

const Shield: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F4C061" strokeWidth="1.5" {...props}>
        <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
    </svg>
)
const Cog: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F4C061" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .7.4 1.34 1.02 1.65.32.17.69.26 1.06.26H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
)
const Person: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F4C061" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
)

const ITEMS: Item[] = [
    {
        title: 'Strategie & advies',
        body: 'Wij brengen structuur, richting en samenhang in het digitale landschap. Van datastrategie tot governance en samenwerking: wij slaan de brug tussen beleid en technologie.',
        Icon: Shield,
        href: '/strategie-en-advies',
    },
    {
        title: 'Tech',
        body: 'Wij ontwerpen en bouwen software die doet wat het moet doen. Van apps tot API-koppelingen tot dashboards. Al onze oplossingen zijn op maat.',
        Icon: Cog,
        href: '/tech',
    },
    {
        title: 'Wie wij zijn',
        body: 'Wij zijn de ontwerpers en bouwers die samen met u werken aan duurzame, adaptieve oplossingen, zodat beleid en technologie elkaar versterken.',
        Icon: Person,
        href: '/wie-wij-zijn',
    },
]

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    io.unobserve(el)
                }
            },
            { threshold: 0.14 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="section" aria-label="Features">
            <div className="container">
                <h2 className={`${s.title} ${visible ? s.in : ''}`}>Beleid en technologie <span className="accent">in harmonie</span></h2>

                <p>
                    Ontwikkelaars en beleidsmakers lijken soms uit verschillende werelden te komen. De een denkt in structuren en
                    systemen, de ander beweegt mee met een veranderende omgeving vol nieuwe eisen. Wij begrijpen beide kanten.
                </p>

                <p>
                    Harmonise IT vormt de schakel tussen technologie en beleid: wij vertalen beleid naar praktische digitale
                    oplossingen en techniek naar helder beleid. Zo brengen we technologie in harmonie met de maatschappij.
                </p>

                <div className={s.grid}>
                    {ITEMS.map(({ title, body, Icon, href }, idx) => (
                        <Link
                            key={title}
                            href={href}
                            className={`${s.card} ${visible ? s.in : ''}`}
                            style={{ transitionDelay: visible ? `${120 + idx * 60}ms` : undefined }}
                        >
                            <div className={s.iconBlockContainer}>
                                <div className={s.iconWrap} aria-hidden>
                                    <Icon className={s.icon} />
                                </div>
                                <h3 className={s.cardTitle}>{title}</h3>
                            </div>
                            <p className={s.cardBody}>{body}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
