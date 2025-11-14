import type { Metadata } from 'next'
import styles from '@/app/energie-monitor/energie-monitor.module.scss'

export const metadata: Metadata = {
    title: 'Harmonise IT | Energie Monitor',
    description: 'Realtime inzicht in energieverbruik en effectiviteit van energiemaatregelen voor bedrijven.',
}

export default function EnergieMonitorPage() {
    return (
        <section className={styles.section} aria-label="Energie Monitor">
            <div className="container">
                <h1>Harmonise Energie Monitor (Beta)</h1>

                <p style={{ maxWidth: '60rem', marginTop: '1rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
                    De <strong>Harmonise Energie Monitor</strong> geeft organisaties realtime inzicht in
                    hun energieverbruik op basis van IoT-metingen. Bedrijven koppelen hun
                    <strong> energiemaatregelen</strong> (zoals isoleren, zonnepanelen of procesoptimalisatie)
                    aan hun eigen profiel. Onze monitor vergelijkt deze maatregelen met het
                    daadwerkelijke verbruik en bepaalt automatisch of de maatregelen <strong>voldoende
                    energiebesparing</strong> opleveren.
                    <br/><br/>
                    Wanneer het verbruik onverwacht stijgt of maatregelen onvoldoende effect hebben,
                    ontvangt de <strong>Omgevingsdienst</strong> automatisch een melding zodat zij gericht
                    kunnen controleren en ondersteunen. Het resultaat: inzicht, naleving én impact: geheel automatisch.
                </p>

                <h2 style={{ marginTop: '3rem' }}>Live Overzicht Energieverbruik</h2>

                <div className={styles.powerbiWrapper}>
                    <iframe
                        className={styles.powerbiFrame}
                        title="Energie Monitor Live"
                        src="https://app.powerbi.com/view?r=eyJrIjoiZGU0MGYzYmMtNzE2Mi00NGM1LWIzOWYtOWI4ZDNlNDA5OTc5IiwidCI6ImU4NjM3Y2NkLTM0MDQtNDA5MS1hYjEzLTE4NzAxZTllMDk1MiIsImMiOjl9&pageName=98a6483d05abd0026e1a"
                        allowFullScreen
                    />
                </div>


            </div>
        </section>
    )
}
