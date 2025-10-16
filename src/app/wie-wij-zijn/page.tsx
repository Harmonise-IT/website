import ContentBlock from '@/app/components/ContentBlock'
import ContactPage from '@/app/contact/page'
import Map from '@/app/components/Map'

export default function WieWijZijnPage() {
    return (
        <section className="section" aria-label="Contact">
            <div className="container">

                <ContentBlock
                    id="over-harmonise-it"
                    kicker="Wie wij zijn"
                    ariaLabel="Over Harmonise IT"
                    title="Over"
                    accent="Harmonise IT"
                    lead="Wie wij zijn tekst."
                    points={[
                        '<strong>Punt 1 →</strong> juist.',
                        '<strong>Punt 2 →</strong> juister.',
                    ]}
                    ctas={[
                        { label: 'Kies voor HIT', href: '/contact', variant: 'primary' },
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
                    mediaSide="right"
                />

                <ContentBlock
                    id="missie-en-visie"
                    kicker="Wie wij zijn"
                    ariaLabel="Missie & Visie"
                    title="Missie & Visie"
                    accent=""
                    lead="Onze Missie & Visie tekst."
                    points={[
                        '<strong>Missie 1 →</strong> super missie.',
                        '<strong>Visie 1 →</strong> super visie.',
                    ]}
                    ctas={[
                        // { label: 'Kies voor HIT', href: '/contact', variant: 'primary' },
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

                <Map></Map>

            </div>

            <ContactPage></ContactPage>
        </section>
    )
}
