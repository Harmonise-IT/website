// app/tech/page.tsx  (of je huidige Tech routestructuur)
import ContactTeam from '@/app/components/ContactTeam'
import ContentBlock from '@/app/components/ContentBlock'

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
                        { label: 'Of start met een Quick Scan →', href: '/strategie-en-advies#quick-scan', variant: 'link' },
                    ]}
                    badges={['TypeScript', 'Next.js', 'Angular', 'Python', 'Docker', 'Kubernetes']}
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
                    id="oplossingen"
                    kicker="Tech"
                    title="Data-uitwisseling"
                    accent="tussen alle partijen"
                    lead="Van prototype tot productie. Wij leveren oplossingen met inzicht in kosten, prestaties en risico's."
                    points={[
                        '<strong>API-koppelingen →</strong> integraties met alle nodige systemen.',
                        '<strong>Observability-first.</strong> Metrics, logs en tracing vanaf dag één.',
                        '<strong>Automatisering.</strong> CI/CD, IaC en repeatable delivery pipelines.',
                    ]}
                    ctas={[
                        // { label: 'Bekijk cases', href: '/case-studies', variant: 'ghost' },
                    ]}
                    badges={['Kubernetes', 'Terraform', 'Grafana']}
                    media={{
                        kind: 'video',
                        src: '/hoofd.mp4',
                        poster: '/hit-logo-blue-transparent.png',
                        loop: true,
                        muted: true,
                        playsInline: true,
                        preload: 'metadata',
                        autoPlayInView: true,
                    }}
                    mediaSide="left"
                />

                {/*<ContentBlock*/}
                {/*    id="software-risk-assessment"*/}
                {/*    kicker="Tech"*/}
                {/*    title="Software risk assessment"*/}
                {/*    accent="zonder verrassingen"*/}
                {/*    lead="Een snelle, pragmatische doorlichting van applicatie, proces en cloud-inrichting. We brengen risico’s in kaart, bepalen kans/impact en leveren concrete maatregelen met eigenaar en doorlooptijd."*/}
                {/*    points={[*/}
                {/*        '<strong>Threat modeling & attack surface.</strong> Systemen, datastromen en afhankelijkheden in kaart; snelle check t.o.v. OWASP Top 10.',*/}
                {/*        '<strong>Security reviews & bewijs.</strong> Code/CI/CD, secrets, permissies en cloudconfiguratie. Misconfiguraties, logging/monitoring en alertering.',*/}
                {/*        '<strong>Prioriteiten & roadmap.</strong> Heatmap met kans/impact, quick wins binnen 2 weken en maatregelen per kwartaal.',*/}
                {/*    ]}*/}
                {/*    ctas={[*/}
                {/*        { label: 'Plan een assessment', href: '/contact?topic=assessment', variant: 'primary' },*/}
                {/*        { label: 'Bekijk voorbeeldrapport →', href: '/downloads/voorbeeld-assessment.pdf', variant: 'link' },*/}
                {/*    ]}*/}
                {/*    badges={['OWASP', 'ISO 27001', 'AVG/GDPR', 'STRIDE', 'CIS Benchmarks']}*/}
                {/*    media={{*/}
                {/*        kind: 'image',*/}
                {/*        src: '/software-risk-assessment.jpg',*/}
                {/*        alt: 'Risk heatmap en bevindingen van een software risk assessment',*/}
                {/*        width: 1280,*/}
                {/*        height: 900,*/}
                {/*    }}*/}
                {/*    mediaSide="right"*/}
                {/*/>*/}


                <div style={{ marginTop: 24 }}>
                    <ContactTeam
                        name="Neem contact op met Yoeri Moens"
                        role="Strategie, Techniek & Beheer"
                        email="y.moens@harmonise.nl"
                        phone="+31 6 4554 0216"
                        photoSrc="/team-yoeri.jpeg"
                        linkLinkedIn="https://www.linkedin.com/in/..."
                    />
                </div>
            </div>
        </section>
    )
}
