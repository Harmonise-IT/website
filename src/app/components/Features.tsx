// components/Features.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '@/app/components/Hero.module.scss' // keep using your existing title styles

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
                    io.unobserve(el) // play once
                }
            },
            { root: null, threshold: 0.18 } // start a bit before fully in view
        )

        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className={styles.hero} aria-label="Intro">
            <div className="container">
                <div className={styles.content}>
                    <h1
                        className={`${styles.title} ${visible ? 'fade-in' : ''}`}
                        style={{ animationDelay: visible ? '400ms' : undefined }}
                    >
                        Our Mission
                    </h1>
                </div>
            </div>
        </section>
    )
}
