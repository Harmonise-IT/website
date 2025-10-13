import styles from '@/app/components/Hero.module.scss'
import Image from 'next/image'

export default function ContactPage() {
    return (
        <section className={styles.hero} aria-label="Intro">
            <div className="container">
                <div className={styles.content}>
                    <h1 className={`${styles.title} fade-in`} style={{ animationDelay: '400ms' }}>
                        Contact pagina
                    </h1>
                </div>
            </div>
        </section>
    )
}
