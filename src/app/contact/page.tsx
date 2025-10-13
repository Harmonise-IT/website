'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './contact.module.scss'

export default function ContactPage() {
    const wrapRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    io.disconnect()
                }
            },
            { threshold: 0.12 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitting(true)
        // TODO: post to your endpoint or server action
        setTimeout(() => {
            setSubmitting(false)
            setSuccess(true)
        }, 1200)
    }

    return (
        <section className={styles.section} aria-label="Contact">
            <div className="container">
                <div ref={wrapRef} className={`${styles.bigCard} ${visible ? styles.in : ''}`}>
                    {/* FORM */}
                    <div className={`${styles.innerCard} ${styles.formCard}`}>
                        <h2 className={styles.lead}>Wij denken graag met je mee</h2>

                        <form className={styles.form} onSubmit={onSubmit}>
                            <div className={styles.grid2}>
                                <div className={styles.field}>
                                    <label htmlFor="name">Naam</label>
                                    <input id="name" name="name" required />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="email">E-mailadres</label>
                                    <input id="email" name="email" type="email" required />
                                </div>
                            </div>

                            <div className={styles.grid2}>
                                <div className={styles.field}>
                                    <label htmlFor="subject">Onderwerp</label>
                                    <input id="subject" name="subject" required />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="phone">Telefoonnummer</label>
                                    <input id="phone" name="phone" type="tel" />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="message">Bericht</label>
                                <textarea id="message" name="message" rows={6} required />
                            </div>

                            <div className={styles.actions}>
                                <button
                                    type="submit"
                                    className={`${styles.submit} ${submitting ? styles.loading : ''} ${success ? styles.success : ''}`}
                                    disabled={submitting || success}  // keeps it white but not clickable
                                >
                                    {!success && (
                                        <>
                                            Verstuur
                                            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                                                <path
                                                    d="M5 12h12M13 6l6 6-6 6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </>
                                    )}
                                    {success && (
                                        <>
                                            Bericht verzonden
                                            <svg className={styles.check} viewBox="0 0 24 24">
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* INFO */}
                    <aside className={`${styles.innerCard} ${styles.infoCard}`}>
                        <p className={styles.pitch}>
                            Wil je weten hoe Harmonise IT jouw gemeente of organisatie kan helpen?
                            Neem contact op voor een vrijblijvend gesprek.
                        </p>

                        <dl className={styles.meta}>
                            <dt>Adres</dt>
                            <dd>Prinsengracht 356-2A,<br />Amsterdam</dd>

                            <dt>Mail</dt>
                            <dd><Link href="mailto:info@harmonise.nl">info@harmonise.nl</Link></dd>

                            <dt>Telefoon</dt>
                            <dd><Link href="tel:+31645540216">+31 6 4554 0216</Link></dd>
                        </dl>
                    </aside>
                </div>
            </div>
        </section>
    )
}
