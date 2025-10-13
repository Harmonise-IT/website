'use client'

import styles from './Team.module.scss'

const TEAM = [
    {
        name: 'Sjouke Elsman',
        role: 'Visie, Strategie & Procesregie',
        description: 'Sjouke Elsman is ...',
        image: '/team-sjouke.png',
    },
    {
        name: 'Yoeri Moens',
        role: 'Strategie, Techniek & Beheer',
        description: 'Yoeri Moens is ...',
        image: '/team-yoeri.jpeg',
    },
]

export default function Team() {
    return (
        <section className={styles.section} aria-label="Team">
            <div className="container">
                <h2 className={styles.title}>Ons Team</h2>

                <div className={styles.grid}>
                    {TEAM.map((member) => (
                        <div key={member.name} className={styles.card}>
                            <div className={styles.imageWrap}>
                                <img src={member.image} alt={member.name} className={styles.image} />
                            </div>
                            <h3 className={styles.name}>{member.name}</h3>
                            <p className={styles.role}>{member.role}</p>
                            <p className={styles.desc}>{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
