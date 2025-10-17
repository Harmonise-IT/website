// app/tech/page.tsx  (of je huidige Tech routestructuur)
import ContactTeam from '@/app/components/ContactTeam'
import ContentBlock from '@/app/components/ContentBlock'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Harmonise IT | Tech',
    description: 'Tech pagina.',
}

export default function TechPage() {
    return (
        <section className="section" aria-label="Tech">
            <div className="container">
                <ContentBlock
                    id="software-op-maat"
                    kicker="Tech"
                    ariaLabel="software-op-maat"
                    title="Applicaties"
                    accent="waar je op kunt rekenen"
                    lead="We ontwerpen en maken software die publieke organisaties écht vooruithelpt.
Onze oplossingen zijn niet theoretisch, maar tastbaar: professionele software die betrouwbaar, veilig en gebruiksvriendelijk is.
We combineren technische vakkennis met inzicht in de publieke context, zodat techniek de bedoeling ondersteunt."
                    points={[
                        '<strong>Apps & Tools →</strong> we ontwikkelen passende oplossingen voor uw digitale uitdagingen.',
                        '<strong>Dashboards →</strong> we ontwikkelen dashboards en analysemethoden waarmee organisaties beter kunnen sturen op maatschappelijke resultaten.',
                    ]}
                    ctas={[
                        { label: 'Plan een gesprek', href: '/contact', variant: 'primary' },
                    ]}
                    badges={['TypeScript', 'Next.js', 'Angular', 'Python', 'Docker', 'Kubernetes']}
                    media={{
                        kind: 'image',
                        src: '/software-op-maat.jpeg',
                        alt: 'Software op maat voor publieke organisaties.',
                    }}
                    mediaSide="right"
                />

                <ContentBlock
                    id="integraties"
                    kicker="Tech"
                    title="Data-uitwisseling"
                    accent="tussen alle partijen"
                    lead="Het veilig delen van data tussen alle relevante systemen wordt steeds belangrijker. Wij bouwen integraties die naadloze data-uitwisseling tussen deze systemen mogelijk maakt."
                    points={[
                        '<strong>API-koppelingen →</strong> integraties met alle relevante systemen.',
                        '<strong>Microservice →</strong> kleinschalige oplossingen die specifieke functionaliteit bieden',
                        '<strong>Automatisering →</strong> workflows die handmatige taken verminderen en processen versnellen',
                    ]}
                    media={{
                        kind: 'image',
                        src: '/integraties.jpeg',
                        alt: 'Integraties tussen systemen.',
                    }}
                    mediaSide="left"
                />

                <div style={{ marginTop: 24 }}>
                    <ContactTeam
                        name="Neem contact op met Yoeri Moens"
                        role="Techniek, Strategie & Beheer"
                        email="y.moens@harmonise.nl"
                        phone="+31 6 4554 0216"
                        photoSrc="/team-yoeri.jpeg"
                        linkLinkedIn="https://www.linkedin.com/in/yoeri-moens"
                    />
                </div>
            </div>
        </section>
    )
}
