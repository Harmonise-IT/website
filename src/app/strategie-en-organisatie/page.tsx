import ContactTeam from '@/app/components/ContactTeam'
import ContentBlock from '@/app/components/ContentBlock'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Harmonise IT | Strategie & organisatie',
    description: 'Strategie & organisatie pagina.',
}

export default function StrategieEnOrganisatiePage() {
    return (
        <section className="section" aria-label="Contact">
            <div className="container">

                <ContentBlock
                    id="datagedreven-werken"
                    kicker="Strategie & organisatie"
                    ariaLabel="strategie"
                    title="Datagedreven"
                    accent="werken"
                    lead="Wij helpen overheden om inzichten uit data te vertalen naar beter beleid en een effectievere uitvoering. Dat vraagt om betrouwbare data en om medewerkers die weten hoe ze data kunnen gebruiken."
                    points={[
                        '<strong>Organisatie en werkprocessen →</strong> Wij ondersteunen overheden bij het verbeteren van informatiestromen en het op elkaar aansluiten van systemen, randvoorwaarden en werkprocessen. Wij helpen bij opgaven als de uitvoering van de Wet open overheid (Woo), de Omgevingswet en zaakgericht werken.',
                        '<strong>Rapportages en dashboards →</strong> Wij ontwikkelen overzichtelijke dashboards en rapportages die toepasbaar zijn in beleid en uitvoering. We zorgen voor betrouwbare datastromen, voor passende risico- en analysemodellen en visuele weergaven die aansluiten op de informatiebehoefte van teams en management. Daarnaast begeleiden we organisaties bij het interpreteren en gebruiken van deze inzichten in dagelijkse besluitvorming.',
                    ]}
                    ctas={[
                        { label: 'Neem contact op', href: '/contact', variant: 'primary' },
                    ]}
                    media={{
                        kind: 'image',
                        src: '/inrichting.jpeg',
                        alt: 'Compliance.',
                    }}
                    mediaSide="right"
                />

                <ContentBlock
                    id="compliance"
                    kicker="Strategie & organisatie"
                    ariaLabel="compliance"
                    title=""
                    accent="Compliance"
                    lead="Wij zorgen dat digitale ambities en wettelijke verplichtingen en afspraken elkaar niet in de weg staan, maar elkaar versterken. "
                    points={[
                        '<strong>Wet en regelgeving →</strong> Wij helpen bij het vertalen van wetgeving, zoals de <span class="accent-500">Wmebv</span>, <span class="accent-500">Wdo</span>, <span class="accent-500">Archiefwet</span> en de <span class="accent-500">Woo</span>, naar praktische kaders voor uitvoering en governance. Zo ontstaat overzicht en ruimte om data verantwoord te benutten.',
                        '<strong>Samenwerking →</strong> Informatie-uitwisseling stopt niet bij gemeentegrenzen. Wij helpen bij het ontwerpen van systemen en processen volgens het principe van ‘één overheid’, gebaseerd op open standaarden en de uitgangspunten van onder andere Common Ground. Zo voorkomen we dubbele investeringen en vergroten we herbruikbaarheid van data.',
                    ]}
                    media={{
                        kind: 'image',
                        src: '/strategie.jpg',
                        alt: 'Strategie voor digitale opgaven.',
                    }}
                    mediaSide="left"
                />

                <div style={{ marginTop: 64 }}>
                    <ContactTeam
                        name="Sjouke Elsman"
                        role="Beleid, Strategie & Procesregie"
                        email="s.elsman@harmonise.nl"
                        phone="+31 645540216"
                        photoSrc="/team-sjouke.png"
                        linkLinkedIn="https://www.linkedin.com/in/sjoukeelsman"
                    />
                </div>
            </div>
        </section>
    )
}
