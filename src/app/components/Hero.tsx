'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './Hero.module.scss'
import RotatingWords from './RotatingWords'

const VIDEOS = [
    { srcWebm: '/hero-video.webm', srcMp4: '/hero-video.mp4', poster: '/hero-image.webp' },
    { srcWebm: '/hero-video-2.webm', srcMp4: '/hero-video-2.mp4', poster: '/hero-image-2.png' },
]

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const prevIndexRef = useRef<number>(0)

    useEffect(() => {
        const active = videoRefs.current[activeIndex]
        if (!active) return

        // Pause + reset all other videos
        videoRefs.current.forEach((v, i) => {
            if (!v || i === activeIndex) return
            try {
                v.pause()
                v.currentTime = 0 // only reset *non-active* videos
            } catch {}
        })

        const handleEnded = () => setActiveIndex((n) => (n + 1) % VIDEOS.length)
        active.loop = false
        active.addEventListener('ended', handleEnded)

        // Let browser autoplay; do NOT reset currentTime or call load() here
        if (active.paused) {
            active.play().catch(() => {}) // allow Chrome autoplay
        }

        const prev = videoRefs.current[prevIndexRef.current]
        if (prev && prev !== active) prev.removeEventListener('ended', handleEnded)
        prevIndexRef.current = activeIndex

        return () => {
            active.removeEventListener('ended', handleEnded)
        }
    }, [activeIndex])


    return (
        <section className={styles.hero} aria-label="Intro">
            <div className={styles.media}>
                {VIDEOS.map((video, idx) => (
                    <video
                        key={idx}
                        ref={(el) => (videoRefs.current[idx] = el)}
                        className={`${styles.video} ${idx === activeIndex ? styles.active : ''}`}
                        autoPlay
                        muted
                        playsInline
                        poster={video.poster}
                    >
                        <source src={video.srcWebm} type="video/webm" />
                        <source src={video.srcMp4} type="video/mp4" />
                        {/* Poster fallback for very old browsers */}
                        <Image src={video.poster} alt="" fill priority style={{ objectFit: 'cover' }} />
                    </video>
                ))}
                <div className={styles.vignette} />
            </div>

            <div className="container">
                <div className={styles.content}>
                    <h1 className={`${styles.title} fade-in`} style={{ animationDelay: '400ms' }}>
                        Harmonise{' '}
                        <span className={styles.breakMobile}>
              <RotatingWords
                  words={['IT', 'Municipalities', 'Companies', 'Government', 'Life']}
                  intervalMs={2400}
              />
            </span>
                    </h1>
                </div>
            </div>
        </section>
    )
}
