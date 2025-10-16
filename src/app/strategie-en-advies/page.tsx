import ContactTeam from '@/app/components/ContactTeam'
import ContentBlock from '@/app/components/ContentBlock'

export default function StrategieEnAdviesPage() {
    return (
        <section className="section" aria-label="Contact">
            <div className="container">

                <ContentBlock
                    id="strategie"
                    kicker="Strategie en advies"
                    ariaLabel="strategie"
                    title="Strategie"
                    accent="voor digitale opgaven"
                    lead="We helpen gemeenten en publieke organisaties om de regie te nemen over hun digitale opgaven. Wij brengen structuur en overzicht, zodat technologie werkt voor de burger en voor de mensen die ermee werken."
                    points={[
                        '<strong>I-visie →</strong> We helpen organisaties hun digitale positie te bepalen in relatie tot maatschappelijke opgaven. Wat betekent digitalisering voor dienstverlening, beleid en samenwerking met inwoners?',
                        '<strong>Data- en informatiestrategie →</strong> We brengen in kaart hoe systemen, processen en data elkaar beïnvloeden en versterken. Overheidsdienstverlening moet begrijpelijk en bereikbaar zijn voor iedereen. We helpen organisaties voldoen aan wet- en regelgeving, waaronder de Wet modernisering elektronische bestuurlijke verkeer (Wmebv). We adviseren over het verantwoord en ethisch gebruik van data. Daarbij voeren we software risk assessments uit om risico’s en afhankelijkheden zichtbaar te maken, en beleid te vertalen naar concrete technische eisen. Zo ontstaat grip op informatiestromen en datakwaliteit.',
                    ]}
                    ctas={[
                        { label: 'Plan een gesprek', href: '/contact', variant: 'primary' },
                        { label: 'Of start met een Quick Scan →', href: '/strategie-en-advies#quick-scan', variant: 'link' },
                    ]}
                    // badges={['Strategie', 'Beleid', 'Advies']}
                    media={{
                        kind: 'video',
                        src: '/software-op-maat.mp4',
                        poster: '/hit-logo-blue-transparent.png',
                        loop: true,
                        muted: true,
                        playsInline: true,
                        preload: 'metadata',
                        autoPlayInView: true,
                    }}
                    mediaSide="right"
                />

                <ContentBlock
                    id="inrichting"
                    kicker="Strategie en advies"
                    ariaLabel="inrichting"
                    title="Inrichting"
                    accent="van uw organisatie"
                    lead=""
                    points={[
                        '<strong>Governance →</strong> We helpen bestuur en organisatie in positie te brengen om sturing te geven aan dataverzameling en -gebruik. Van raad tot uitvoering: we adviseren hoe de beleidscyclus hierop ingericht kan worden.',
                        '<strong>Samenwerking →</strong> Informatie-uitwisseling stopt niet bij gemeentegrenzen. We helpen bij het ontwerpen van systemen en processen volgens het principe van ‘één overheid’, gebaseerd op open standaarden en de uitgangspunten van Common Ground. Zo voorkomen we dubbele investeringen en vergroten we herbruikbaarheid van data.',
                        '<strong>Applicatielandschap & leveranciersadvies →</strong> We geven onafhankelijk advies over inrichting en samenhang van applicaties. Daarbij kijken we niet naar contracten of platforms, maar naar wat de organisatie écht nodig heeft om duurzaam en flexibel te blijven.',
                    ]}
                    ctas={[
                        { label: 'Vraag advies aan →', href: '/strategie-en-advies#quick-scan', variant: 'link' },
                    ]}
                    media={{
                        kind: 'video',
                        src: '/software-op-maat.mp4',
                        poster: '/hit-logo-blue-transparent.png',
                        loop: true,
                        muted: true,
                        playsInline: true,
                        preload: 'metadata',
                        autoPlayInView: true,
                    }}
                    mediaSide="left"
                />

                <div style={{ marginTop: 64 }}>
                    <ContactTeam
                        name="Neem contact op met Sjouke Elsman"
                        role="Visie, Strategie & Procesregie"
                        email="s.elsman@harmonise.nl"
                        phone="+31 645540216"
                        photoSrc="/team-sjouke.png"
                        linkLinkedIn="https://www.linkedin.com/in/..."
                    />
                </div>
            </div>
        </section>
    )
}
