import ContactTeam from '@/app/components/ContactTeam'
import ContentBlock from '@/app/components/ContentBlock'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Harmonise IT | Strategie & advies',
    description: 'Strategie & advies pagina.',
}

export default function StrategieEnAdviesPage() {
    return (
        <section className="section" aria-label="Contact">
            <div className="container">

                <ContentBlock
                    id="strategie"
                    kicker="Strategie & advies"
                    ariaLabel="strategie"
                    title="Strategie"
                    accent="voor digitale opgaven"
                    lead="Wij helpen gemeenten en publieke organisaties om de regie te nemen over hun digitale opgaven. Wij brengen structuur en overzicht, zodat technologie werkt voor de burger en voor de mensen die ermee werken."
                    points={[
                        '<strong>Visie op de digitale overheid →</strong> Wij helpen lokale overheden en uitvoeringsorganisaties bij het bepalen van hun positie ten aanzien van digitalisering en maatschappelijke opgaven. Wat betekent digitalisering voor inwoners, dienstverlening, beleid en samenwerking?\n',
                        '<strong>Grip op data en informatie →</strong> Wij helpen overheden om inzicht te krijgen in hun datakwaliteit en informatiestromen, en zorgen dat deze elkaar versterken. Daarbij vertalen we wetgeving, zoals de Wmebv en de Woo, naar praktische kaders voor uitvoering en governance. Zo ontstaat overzicht, vertrouwen en ruimte om data verantwoord te benutten.\n',
                    ]}
                    ctas={[
                        { label: 'Stel uw vraag', href: '/contact', variant: 'primary' },
                    ]}
                    media={{
                        kind: 'image',
                        src: '/inrichting.jpeg',
                        alt: 'Inrichting van uw digitale landschap.',
                    }}
                    mediaSide="right"
                />

                <ContentBlock
                    id="inrichting"
                    kicker="Strategie & advies"
                    ariaLabel="inrichting"
                    title="Inrichting"
                    accent="van uw organisatie"
                    lead=""
                    points={[
                        '<strong>Datagedreven werken →</strong> Wij helpen overheden om inzichten uit data te vertalen naar beter beleid en een effectievere uitvoering. Dat vraagt om betrouwbare data en om medewerkers die weten hoe ze data kunnen gebruiken.',
                        '<strong>Uitvoeringsvraakstukken →</strong> Wij helpen overheden om hun uitvoering toekomstbestendig te maken: door processen te herontwerpen, informatiestromen te verbeteren en systemen goed op elkaar aan te sluiten. Wij helpen bij opgaven als de invoering van het Digitaal Stelsel Omgevingswet <span class="accent-500">(DSO)</span>, de uitvoering van de Wet modernisering elektronisch bestuurlijk verkeer <span class="accent-500">(Wmebv)</span>, de Wet open overheid <span class="accent-500">(Woo)</span> en zaakgericht werken <span class="accent-500">(ZGW)</span>.',
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
