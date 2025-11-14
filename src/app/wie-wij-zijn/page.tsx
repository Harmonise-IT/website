import ContentBlock from '@/app/components/ContentBlock'
import Map from '@/app/components/Map'
import s from './WieWijZijnPage.module.scss'
import type { Metadata } from 'next'
import VennDiagram from '@/app/components/VennDiagram'

export const metadata: Metadata = {
    title: 'Harmonise IT | Wie wij zijn',
    description: 'Wie wij zijn pagina.',
}

export default function WieWijZijnPage() {
    return (
        <section className="section" aria-label="WieWijZijn">
            <div className="container">

                <h2 className={`${s.title} ${s.in}`}>Over <span className={s.accent}>Harmonise IT</span></h2>

                <p>
                    Ontwikkelaars en beleidsmakers lijken soms uit verschillende werelden te komen. De een denkt in structuren en systemen, de ander beweegt mee met een veranderende omgeving vol nieuwe eisen. Wij begrijpen beide kanten. Harmonise IT vormt de schakel tussen technologie en beleid: wij vertalen beleid naar praktische digitale oplossingen en techniek naar helder beleid. Zo brengen we technologie in harmonie met de maatschappij.
                </p>

                <p>
                    Wij zijn de ontwerpers en bouwers die samen met u werken aan duurzame, adaptieve oplossingen, zodat beleid en technologie elkaar versterken.
                </p>

                <ContentBlock
                    id="onze-visie"
                    kicker="Wie wij zijn"
                    ariaLabel="Onze visie"
                    title="Onze"
                    accent="visie"
                    className="driePerspectieven"
                    lead="Bij Harmonise IT geloven we dat duurzame digitale ontwikkeling ontstaat daar waar drie perspectieven elkaar raken: menselijk, beleidsmatig en technisch."
                    points={[
                        '<strong class="accentSecondary">Menselijk →</strong> Technologie is er voor mensen. Wij houden er rekening mee dat digitale oplossingen aansluiten bij de manier waarop mensen denken, samenwerken en beslissingen nemen. Dit geldt niet alleen voor de overheden die met deze oplossingen werken, maar ook voor burgers en bedrijven. Gebruiksvriendelijkheid, inclusiviteit en toegankelijkheid staan centraal.',
                        '<strong class="accentSecondary">Beleidsmatig →</strong> De overheid opereert in een omgeving die continu verandert. Beleid evolueert, regelgeving wordt aangescherpt, maatschappelijke verwachtingen verschuiven. Systemen moeten vanaf het begin adaptief worden ingericht om rekening te houden met deze ontwikkelingen. Daarbij houden we rekening met gezamenlijke open standaarden.',
                        '<strong class="accentSecondary">Technisch →</strong> Software en infrastructuur vormen vormen de technische basis voor de uitvoering van beleid en werkprocessen. Wij ontwerpen en bouwen systemen die betrouwbaar, schaalbaar en aanpasbaar zijn.',
                    ]}
                    afterPoints="Door deze drie elementen in samenhang te ontwikkelen, creëren we harmonieuze IT: technologie die mensen ondersteunt, beleid versterkt en maatschappelijke doelen dichterbij brengt."
                    media={{
                        kind: 'node',
                        node: <VennDiagram className="w-100" />,
                        nodeClassName: 'w-100',
                        ariaLabel: 'Venn-diagram drie perspectieven'
                    }}
                    forceShowMediaOnMobile={true}
                    mediaSide="left"
                />

                <div id="locatie"></div>
                <Map></Map>

            </div>
        </section>
    )
}
