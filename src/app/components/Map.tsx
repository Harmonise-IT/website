import styles from './Map.module.scss'

export default function Map() {
    return (
        <section aria-label="Locatie" className={styles.mapSection}>
            <h2>Locatie</h2>
            <p>Je vindt ons in Amsterdam aan de Prinsengracht. Ben je in de buurt? Kom gerust langs, we ontmoeten je graag.</p>
            <div className={styles.map}>
                <iframe
                    title="Harmonise Locatie"
                    src="https://maps.google.com/maps?q=52.3679498,4.8821308&z=17&output=embed&scrollwheel=0"
                    style={{ pointerEvents: 'none' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                />

                <div className={styles.mapBadge}>
                    <h3>Hier vind je ons</h3>
                    <p>Prinsengracht 356-2A, Amsterdam</p>
                    <div className={styles.mapActions}>
                        <a
                            className={`${styles.btn} ${styles.btnPrimary}`}
                            href="https://www.google.com/maps/dir/?api=1&destination=Prinsengracht+356-2A,+Amsterdam"
                            target="_blank" rel="noreferrer"
                        >
                            Route
                        </a>
                        <a
                            className={styles.btn}
                            href="https://maps.google.com/?q=Prinsengracht+356-2A,+Amsterdam"
                            target="_blank" rel="noreferrer"
                        >
                            Open in Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
