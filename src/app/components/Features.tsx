// components/Features.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import s from './Features.module.scss'

type Item = { title: string; body: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }

// 00feff
const Shield: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#00feff" strokeWidth="1.5" {...props}>
        <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
    </svg>
)
const Cog: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#00feff" strokeWidth="1.5" {...props}>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        <path d="M19 12a7 7 0 0 0-.1-1l1.8-1.4-1.8-3.2-2.1.6a7 7 0 0 0-1.7-1L15 2h-6l-.1 2a7 7 0 0 0-1.7 1l-2.1-.6-1.8 3.2L4 11a7 7 0 0 0 0 2l-1.8 1.4 1.8 3.2 2.1-.6a7 7 0 0 0 1.7 1L9 22h6l.1-2a7 7 0 0 0 1.7-1l2.1.6 1.8-3.2L18.9 13c.07-.33.1-.66.1-1z" />
    </svg>
)
const Cloud: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#00feff" strokeWidth="1.5" {...props}>
        <path d="M7 18h9a4 4 0 0 0 0-8 6 6 0 0 0-11-1 4 4 0 0 0 2 9z" />
    </svg>
)
const Spark: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#00feff" strokeWidth="1.5" {...props}>
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4" />
    </svg>
)
const Chart: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#00feff" strokeWidth="1.5" {...props}>
        <path d="M4 19V5M10 19V9M16 19V3M22 19H2" />
    </svg>
)
const Handshake: Item['Icon'] = (props) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#00feff" strokeWidth="1.5" {...props}>
        <path d="M8 13l3-3a3 3 0 0 1 4 0l3 3" />
        <path d="M3 12l5-5 3 3m5 5l5-5-3-3" />
    </svg>
)

const ITEMS: Item[] = [
    { title: 'Veiligheid', body: 'Dreigingsmodellen, hardening en continue beveiligingsreviews.', Icon: Shield },
    { title: 'Betrouwbare levering', body: 'Lean, inzichtelijke pipelines die altijd op tijd opleveren.', Icon: Cog },
    { title: 'Cloudarchitectuur', body: 'Pragmatische patronen op AWS/Azure met duidelijke kostenbeheersing.', Icon: Cloud },
    { title: 'Automatisering', body: 'Elimineer handmatig werk met scripts, IaC en slimme workflows.', Icon: Spark },
    { title: 'Inzichten', body: 'Datamodellering en dashboards die teams écht gebruiken.', Icon: Chart },
    { title: 'Partnerschap', body: 'Wij stemmen technologie af op uw organisatieritme.', Icon: Handshake },
]

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el) } },
            { threshold: 0.14 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="section" aria-label="Features">
            <div className="container">
                <h2 className={`${s.title} ${visible ? s.in : ''}`}>Onze Missie</h2>

                <div className={s.grid}>
                    {ITEMS.map(({ title, body, Icon }, idx) => (
                        <article key={title} className={`${s.card} ${visible ? s.in : ''}`} style={{ transitionDelay: visible ? `${120 + idx * 60}ms` : undefined }}>
                            <div className={s.iconWrap} aria-hidden>
                                <Icon className={s.icon}/>
                            </div>
                            <h3 className={s.cardTitle}>{title}</h3>
                            <p className={s.cardBody}>{body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
