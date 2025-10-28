'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.scss'
import RotatingWords from './RotatingWords'

const VIDEOS = [
    { srcWebm: '/hero/hero-video-1.webm', srcMp4: '/hero/hero-video-1.mp4', poster: '/hero/hero-image-1.webp' },
    { srcWebm: '/hero/hero-video-2.webm', srcMp4: '/hero/hero-video-2.mp4', poster: '/hero/hero-image-2.webp' },
    { srcWebm: '/hero/hero-video-3.webm', srcMp4: '/hero/hero-video-3.mp4', poster: '/hero/hero-image-3.webp' },
]

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

    useEffect(() => {
        const active = videoRefs.current[activeIndex]
        if (!active) return

        const CROSSFADE_LEAD = 0.55; // seconds before end to start crossfade
        let preFaded = false

        // Start crossfade slightly before the end
        const onTimeUpdate = () => {
            if (preFaded) return
            const dur = active.duration
            if (!isFinite(dur) || dur === 0) return
            if (active.currentTime >= dur - CROSSFADE_LEAD) {
                preFaded = true

                const nextIdx = (activeIndex + 1) % VIDEOS.length
                const nextVid = videoRefs.current[nextIdx]

                if (nextVid) {
                    // Ensure next video is ready & at start
                    try { if (nextVid.readyState < 2) nextVid.load() } catch {}
                    try { nextVid.currentTime = 0 } catch {}

                    // Start playing next video behind the scenes
                    nextVid.play().catch(() => {})

                    // Fade out current, fade in next (slight rAF to guarantee first frame is rendered)
                    active.classList.add(styles.fadeOut)
                    requestAnimationFrame(() => { nextVid.classList.add(styles.active) })

                    // Clean up fadeOut class after CSS transition ends
                    setTimeout(() => { active.classList.remove(styles.fadeOut) }, 1000) // match CSS duration
                }
            }
        }

        const handleEnded = () => setActiveIndex((n) => (n + 1) % VIDEOS.length)

        // Preload the next video early
        const nextIndex = (activeIndex + 1) % VIDEOS.length
        const nextVideo = videoRefs.current[nextIndex]
        if (nextVideo && nextVideo.readyState === 0) {
            try { nextVideo.load() } catch {}
        }

        // Keep others reset (except the active one)
        videoRefs.current.forEach((v, i) => {
            if (!v || i === activeIndex) return
            try { v.pause(); v.currentTime = 0 } catch {}
        })

        active.loop = false
        active.addEventListener('timeupdate', onTimeUpdate)
        active.addEventListener('ended', handleEnded)

        if (active.paused) {
            active.play().catch(() => {})
        }

        return () => {
            active.removeEventListener('timeupdate', onTimeUpdate)
            active.removeEventListener('ended', handleEnded)
        }
    }, [activeIndex])



    return (
        <section className={styles.hero} aria-label="Intro">
            <div className={styles.media}>
                {VIDEOS.map((video, idx) => (
                    <video
                        key={idx}
                        ref={(el) => { videoRefs.current[idx] = el; }}
                        className={`${styles.video} ${idx === activeIndex ? styles.active : ''}`}
                        autoPlay
                        muted
                        playsInline
                        poster={video.poster}
                        preload={idx === activeIndex ? 'metadata' : 'none'}
                    >
                        <source src={video.srcWebm} type="video/webm" />
                        <source src={video.srcMp4} type="video/mp4" />
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
                  words={['IT', 'Strategy', 'Applications', 'Governance', 'Data']}
                  intervalMs={2200}
              />
            </span>
                    </h1>
                </div>
            </div>

            <div className={styles.scrollIndicator} aria-hidden="true">
                <span className={styles.visuallyHidden}>Scroll</span>
                <div className={styles.scrollCircle}>
                    <svg
                        className={styles.scrollArrow}
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M6 10l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    )
}
