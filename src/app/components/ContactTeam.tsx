'use client'

import Image from 'next/image'
import styles from './ContactTeam.module.scss'
import Link from 'next/link'

export type ContactTeamProps = {
    name: string
    role?: string
    email: string
    phone?: string
    photoSrc: string
    linkLinkedIn?: string
}

export default function ContactTeam({
                                        name,
                                        role = 'Contactpersoon',
                                        email,
                                        phone,
                                        photoSrc,
                                        linkLinkedIn,
                                    }: ContactTeamProps) {
    return (
        <aside className={styles.wrap} aria-label={`Contactpersoon ${name}`}>
            <div className={styles.media}>
                <Image
                    src={photoSrc}
                    alt={`Foto van ${name}`}
                    width={256}
                    height={256}
                    className={styles.photo}
                    sizes="(max-width: 560px) 220px, 256px"
                    priority
                />
            </div>


            <div className={styles.meta}>
                <h3 className={styles.name}>Neem contact op met <span className='accent'>{name}</span></h3>
                <p className={styles.role}>
                    {role}
                </p>

                <div className={styles.actions}>
                    <Link className={styles.btn} href={`mailto:${email}`} aria-label={`E-mail naar ${name}`}>
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                            <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
                            <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
                        </svg>
                        Mail
                    </Link>

                    {phone && (
                        <Link className={styles.btn} href={`tel:${phone.replace(/\s+/g, '')}`} aria-label={`Bel ${name}`}>
                            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                                <path d="M6.5 4.5l3 3-2 2a12 12 0 006 6l2-2 3 3-1 2a3 3 0 01-2 1.5c-7.6 0-14-6.4-14-14a3 3 0 011.5-2l2-.5z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
                            </svg>
                            Bel
                        </Link>
                    )}

                    {linkLinkedIn && (
                        <Link className={styles.ghost} href={linkLinkedIn} target="_blank" rel="noreferrer">
                            LinkedIn
                        </Link>
                    )}
                </div>

                <div className={styles.details}>
                    <Link href={`mailto:${email}`}>{email}</Link>
                    {phone && <span> · <Link href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</Link></span>}
                </div>
            </div>

            {/* JSON-LD for richer search snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name,
                        jobTitle: role,
                        email: `mailto:${email}`,
                        telephone: phone ?? undefined,
                        image: photoSrc,
                    }),
                }}
            />
        </aside>
    )
}
