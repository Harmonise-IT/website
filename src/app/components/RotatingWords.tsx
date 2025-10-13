'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from './Hero.module.scss'

type Props = {
    words: string[]
    intervalMs?: number
}

export default function RotatingWords({ words, intervalMs = 2200 }: Props) {
    const [i, setI] = useState(0)
    const [phase, setPhase] = useState<'in' | 'out'>('in')

    // Pick the longest word once to reserve width via CSS (no layout shift).
    const longest = useMemo(
        () => words.reduce((a, b) => (b.length > a.length ? b : a), ''),
        [words]
    )

    // Rotate words with a short fade-out window.
    useEffect(() => {
        if (words.length <= 1) return
        const showDur = Math.max(0, intervalMs - 350) // leave time for fade out
        const t1 = window.setTimeout(() => setPhase('out'), showDur)
        return () => window.clearTimeout(t1)
    }, [i, intervalMs, words.length])

    useEffect(() => {
        if (words.length <= 1) return
        if (phase !== 'out') return
        const t2 = window.setTimeout(() => {
            setI((n) => (n + 1) % words.length)
            setPhase('in')
        }, 350) // match CSS out duration
        return () => window.clearTimeout(t2)
    }, [phase, words.length])

    return (
        <span className={styles.rotatorStable} aria-live="polite">
      {/* Hidden sizer reserves the final width from first paint */}
            <span className={styles.rotatorSizer} aria-hidden>
        {longest}
      </span>

            {/* Visible word layered on top with in/out transitions */}
            <span
                className={`${styles.wordNow} ${
                    phase === 'in' ? styles.wordIn : styles.wordOut
                }`}
            >
        {words[i]}
      </span>
    </span>
    )
}
