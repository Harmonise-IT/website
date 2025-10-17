'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ContentBlock.module.scss'

type Cta = {
    label: string
    href: string
    variant?: 'primary' | 'link' | 'ghost'
}

type MediaVideo = {
    kind: 'video'
    src: string
    poster?: string
    loop?: boolean
    muted?: boolean
    preload?: 'auto' | 'metadata' | 'none'
    playsInline?: boolean
    autoPlayInView?: boolean   // default true
}

type MediaImage = {
    kind: 'image'
    src: string
    alt: string
    width?: number
    height?: number
    priority?: boolean
    // If you prefer <img> over next/image, we keep it simple here.
}

type MediaNode = {
    kind: 'node'
    node: React.ReactNode
}

export type ContentBlockProps = {
    id?: string
    ariaLabel?: string
    className?: string

    kicker?: string
    title: string
    accent?: string                // text part that gets --primary-color
    lead?: string

    points?: Array<string | React.ReactNode>
    afterPoints?: string
    ctas?: Cta[]
    badges?: string[]

    media?: MediaVideo | MediaImage | MediaNode
    mediaSide?: 'left' | 'right'   // default 'right'
}

export default function ContentBlock({
                                         id,
                                         ariaLabel,
                                         className,
                                         kicker,
                                         title,
                                         accent,
                                         lead,
                                         points = [],
                                         afterPoints,
                                         ctas = [],
                                         badges = [],
                                         media,
                                         mediaSide = 'right',
                                     }: ContentBlockProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    io.disconnect()
                }
            },
            { threshold: 0.18 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    useEffect(() => {
        if (!inView) return
        if (media && media.kind === 'video') {
            const auto = media.autoPlayInView ?? true
            if (auto && videoRef.current) {
                videoRef.current.play().catch(() => {})
            }
        }
    }, [inView, media])

    return (
        <section
            id={id}
            ref={sectionRef}
            className={[
                styles.wrap,
                'section',
                className || '',
                mediaSide === 'left' ? styles.mediaLeft : styles.mediaRight,
            ].join(' ')}
            aria-label={ariaLabel || title}
        >
            <div className="container">
                <div className={styles.grid}>
                    {/* Copy column */}
                    <div className={[styles.copy, inView ? styles.in : ''].join(' ')}>
                        {kicker && <div className={styles.kicker}>{kicker}</div>}

                        <h2 className={styles.title}>
                            {title}{' '}
                            {accent ? <span className={styles.accent}>{accent}</span> : null}
                        </h2>

                        {lead && <p className={styles.lead}>{lead}</p>}

                        {!!points?.length && (
                            <ul className={styles.points}>
                                {points.map((p, i) => (
                                    <li key={i} style={{ transitionDelay: inView ? `${60 * (i + 1)}ms` : undefined }}>
                                        {typeof p === 'string' ? <span dangerouslySetInnerHTML={{ __html: p }} /> : p}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {!!afterPoints && <p className={styles.afterPoints}>{afterPoints}</p>}

                        {!!ctas?.length && (
                            <div className={styles.ctas}>
                                {ctas.map((c, i) => (
                                    <a
                                        key={i}
                                        className={
                                            c.variant === 'link'
                                                ? styles.link
                                                : c.variant === 'ghost'
                                                    ? styles.ghost
                                                    : styles.primary
                                        }
                                        href={c.href}
                                    >
                                        {c.label}
                                    </a>
                                ))}
                            </div>
                        )}

                        {!!badges?.length && (
                            <div className={styles.badges}>
                                {badges.map((b, i) => (
                                    <span key={i}>{b}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Media column */}
                    {media && (
                        <div className={[styles.visual, inView ? styles.in : ''].join(' ')}>
                            <div className={styles.frame}>
                                {media.kind === 'video' && (
                                    <video
                                        ref={videoRef}
                                        className={styles.video}
                                        src={media.src}
                                        poster={media.poster}
                                        muted={media.muted ?? true}
                                        loop={media.loop ?? true}
                                        playsInline={media.playsInline ?? true}
                                        preload={media.preload ?? 'metadata'}
                                    />
                                )}

                                {media.kind === 'image' && (
                                    // Using plain <img> keeps the component light & generic.
                                    <img
                                        className={styles.img}
                                        src={media.src}
                                        alt={media.alt}
                                        width={media.width}
                                        height={media.height}
                                        loading={media.priority ? 'eager' : 'lazy'}
                                    />
                                )}

                                {media.kind === 'node' && media.node}

                                <div className={styles.glow} aria-hidden />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
