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
                    lead="We helpen gemeenten en publieke organisaties om de regie te nemen over hun digitale opgaven. Wij brengen structuur en overzicht, zodat technologie werkt voor de burger en voor de mensen die ermee werken."
                    points={[
                        '<strong>I-visie →</strong> We helpen organisaties hun digitale positie te bepalen in relatie tot maatschappelijke opgaven. Wat betekent digitalisering voor dienstverlening, beleid en samenwerking met inwoners?',
                        '<strong>Data- en informatiestrategie →</strong> We brengen in kaart hoe systemen, processen en data elkaar beïnvloeden en versterken. Overheidsdienstverlening moet begrijpelijk en bereikbaar zijn voor iedereen. We helpen organisaties voldoen aan wet- en regelgeving, waaronder de Wet modernisering elektronische bestuurlijke verkeer (Wmebv). We adviseren over het verantwoord en ethisch gebruik van data. Daarbij voeren we software risk assessments uit om risico’s en afhankelijkheden zichtbaar te maken, en beleid te vertalen naar concrete technische eisen. Zo ontstaat grip op informatiestromen en datakwaliteit.',
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
                        '<strong>Uitvoeringsvraakstukken →</strong> Veel uitvoeringsvraagstukken bij gemeenten, provincies en omgevingsdiensten draaien in de kern om data. Zaaksystemen en samenwerkingsfunctionaliteiten zijn nauw verbonden met processen, informatievoorziening en datakwaliteit. Wij helpen overheidsorganisaties om deze onderdelen van de uitvoering goed in te richten.',
                        '<strong>Governance →</strong> We helpen bestuur en organisatie in positie te brengen om sturing te geven aan dataverzameling en -gebruik. Van raad tot uitvoering: we adviseren hoe de beleidscyclus hierop ingericht kan worden.',
                        '<strong>Samenwerking →</strong> Informatie-uitwisseling stopt niet bij gemeentegrenzen. We helpen bij het ontwerpen van systemen en processen volgens het principe van ‘één overheid’, gebaseerd op open standaarden en de uitgangspunten van Common Ground. Zo voorkomen we dubbele investeringen en vergroten we herbruikbaarheid van data.',
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
                        name="Neem contact op met Sjouke Elsman"
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
