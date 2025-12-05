'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './contact.module.scss'

type ContactPayload = {
    name: string
    email: string
    subject?: string
    phone?: string
    message: string
    company?: string // honeypot
}

type FieldErrors = Partial<Record<keyof ContactPayload, string>>

const MESSAGE_MIN = 12
const LS_KEY = 'contactDraft_v1'

export default function ContactClient() {
    const wrapRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const firstInvalidRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

    const [visible, setVisible] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [messageLen, setMessageLen] = useState(0)
    const [values, setValues] = useState<ContactPayload>({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: '',
        company: '',
    })
    const [errors, setErrors] = useState<FieldErrors>({})

    // stable ids for aria-describedby
    const nameErrId = useId()
    const emailErrId = useId()
    const msgErrId = useId()

    // enter animation
    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
                io.disconnect()
            }
        }, { threshold: 0.12 })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    // Load/save draft
    useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEY)
            if (raw) {
                const draft = JSON.parse(raw) as ContactPayload
                setValues(v => ({ ...v, ...draft }))
                setMessageLen((draft.message || '').length)
            }
        } catch {}
    }, [])
    useEffect(() => {
        const { company, ...safe } = values
        try { localStorage.setItem(LS_KEY, JSON.stringify(safe)) } catch {}
    }, [values])

    // Validation
    function validate(v: ContactPayload): FieldErrors {
        const e: FieldErrors = {}
        if (!v.name.trim()) e.name = 'Vul je naam in.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Vul een geldig e-mailadres in.'
        if (!v.message || v.message.trim().length < MESSAGE_MIN) e.message = `Schrijf minimaal ${MESSAGE_MIN} tekens.`
        return e
    }

    function onChange<K extends keyof ContactPayload>(key: K, val: string) {
        setValues(prev => ({ ...prev, [key]: val }))
        if (key === 'message') setMessageLen(val.length)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setSuccess(false)
        firstInvalidRef.current = null

        const nextErrors = validate(values)
        setErrors(nextErrors)

        if (Object.keys(nextErrors).length) {
            // focus the first invalid field for accessibility
            const order: (keyof ContactPayload)[] = ['name', 'email', 'message']
            for (const k of order) {
                if (nextErrors[k]) {
                    const el = formRef.current?.elements.namedItem(k) as HTMLInputElement | HTMLTextAreaElement | null
                    el?.focus()
                    break
                }
            }
            return
        }

        // Honeypot
        if (values.company) {
            setSuccess(true)
            return
        }

        setSubmitting(true)
        try {
            // fetch with timeout guard
            const ctrl = new AbortController()
            const t = setTimeout(() => ctrl.abort(), 15000)

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
                signal: ctrl.signal,
                cache: 'no-store'
            })

            clearTimeout(t)

            const data = await res.json().catch(() => ({}))
            if (!res.ok || !data?.ok) {
                throw new Error(data?.error || 'Verzenden mislukt. Probeer het later opnieuw.')
            }

            setSuccess(true)
            setValues({ name: '', email: '', subject: '', phone: '', message: '', company: '' })
            setMessageLen(0)
            setErrors({})
            try { localStorage.removeItem(LS_KEY) } catch {}
            formRef.current?.reset()
        } catch (err: unknown) {
            const msg = err instanceof Error
                ? (err.name === 'AbortError' ? 'Tijdslimiet bereikt. Probeer opnieuw.' : err.message)
                : 'Er ging iets mis.'
            setError(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className={styles.section} aria-label="Contact">
            <div className="container">
                <div ref={wrapRef} className={`${styles.bigCard} ${visible ? styles.in : ''}`}>
                    {/* FORM */}
                    <div className={`${styles.innerCard} ${styles.formCard}`}>
                        <h2 className={styles.lead}>Wij denken graag met je mee</h2>

                        {/* success banner */}
                        {success && (
                            <div className={styles.banner} role="status" aria-live="polite">
                                🎉 Bedankt! Je bericht is verzonden. We reageren zo snel mogelijk.
                            </div>
                        )}

                        <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
                            {/* Honeypot (hidden) */}
                            <div className={styles.hp} aria-hidden>
                                <label htmlFor="company">Bedrijfsnaam</label>
                                <input id="company" name="company" autoComplete="off" tabIndex={-1} />
                            </div>

                            <div className={styles.grid2}>
                                <div className={styles.field}>
                                    <label htmlFor="name">Naam</label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={values.name}
                                        onChange={(e) => onChange('name', e.target.value)}
                                        autoComplete="name"
                                        required
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? nameErrId : undefined}
                                    />
                                    {errors.name && <p id={nameErrId} className={styles.error}>{errors.name}</p>}
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="email">E-mailadres</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={(e) => onChange('email', e.target.value)}
                                        autoComplete="email"
                                        inputMode="email"
                                        required
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? emailErrId : undefined}
                                    />
                                    {errors.email && <p id={emailErrId} className={styles.error}>{errors.email}</p>}
                                </div>
                            </div>

                            <div className={styles.grid2}>
                                <div className={styles.field}>
                                    <label htmlFor="subject">Onderwerp <span className={styles.muted}>(optioneel)</span></label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        value={values.subject}
                                        onChange={(e) => onChange('subject', e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="phone">Telefoonnummer <span className={styles.muted}>(optioneel)</span></label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        value={values.phone}
                                        onChange={(e) => onChange('phone', e.target.value)}
                                        placeholder="+31 6 1234 5678"
                                    />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="message">Bericht</label>
                                    <span className={styles.counter} aria-live="polite">
                    {messageLen}/{Math.max(MESSAGE_MIN, 200)}+
                  </span>
                                </div>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={values.message}
                                    onChange={(e) => onChange('message', e.target.value)}
                                    required
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? msgErrId : undefined}
                                />
                                {errors.message && <p id={msgErrId} className={styles.error}>{errors.message}</p>}
                            </div>

                            {error && (
                                <p className={styles.error} role="alert" aria-live="assertive">
                                    {error}
                                </p>
                            )}

                            <div className={styles.actions}>
                                <button
                                    type="submit"
                                    className={`${styles.submit} ${submitting ? styles.loading : ''} ${success ? styles.success : ''}`}
                                    disabled={submitting || success}
                                >
                                    {!success ? (
                                        <>
                                            {submitting ? 'Versturen…' : 'Verstuur'}
                                            <span className={styles.iconWrap} aria-hidden>
                        {!submitting ? (
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <span className={styles.spinner} />
                        )}
                      </span>
                                        </>
                                    ) : (
                                        <>
                                            Bericht verzonden
                                            <svg className={styles.check} viewBox="0 0 24 24" aria-hidden>
                                                <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
                            Wil je weten hoe Harmonise jouw organisatie kan helpen?
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
