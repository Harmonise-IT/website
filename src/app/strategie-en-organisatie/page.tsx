import ContactTeam from '@/app/components/ContactTeam'
import ContentBlock from '@/app/components/ContentBlock'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Harmonise | Strategie & organisatie',
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
                    flipAccent={true}
                    lead="Wij helpen overheden om inzichten uit data te vertalen naar beter beleid en een effectievere uitvoering. Dat vraagt om betrouwbare data en om medewerkers die weten hoe ze data kunnen gebruiken."
                    points={[
                        '<strong>Architectuur en werkprocessen →</strong> Wij ondersteunen overheden bij het verbeteren van datastromen en het op elkaar afstemmen van systemen en werkprocessen. Toegankelijkheid voor medewerkers en aansluiting bij cultuur is hierbij cruciaal. Zo wordt datagedreven werken een duurzaam onderdeel van de organisatie.',
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
                        '<strong>Wet en regelgeving →</strong> Wij helpen gemeenten te voldoen aan wetgeving, zoals de <span class="accent-500">Wmebv</span>, <span class="accent-500">Omgevingswet (DSO)</span>, <span class="accent-500">Archiefwet</span> en de <span class="accent-500">Woo</span>, naar praktische kaders voor de uitvoering. Daardoor wordt het mogelijk om data verantwoord te benutten.',
                        '<strong>Samenwerking →</strong> Informatie-uitwisseling stopt niet bij gemeentegrenzen. Wij helpen bij het ontwerpen van systemen en processen volgens het principe van <span class="accent-500">één overheid</span>, gebaseerd op open standaarden en de uitgangspunten van onder andere <span class="accent-500">Common Ground</span>. Zo voorkomen we dubbele investeringen en vergroten we herbruikbaarheid van data.',
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
