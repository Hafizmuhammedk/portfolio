import styles from './Hero.module.css';
import HeroTechnicalVisual from './HeroTechnicalVisual';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.badge} data-hero-exit>
          <span className={styles.badgeText}>AI ENGINEER</span>
        </div>

        <h1 className={styles.title} data-hero-exit>
          <span className={styles.line}>I BUILD DIGITAL</span>
          <span className={styles.line}>INTELLIGENT</span>
          <span className={styles.line}>SYSTEMS.</span>
        </h1>

        <p className={styles.description} data-hero-exit>
          I build real-time AI systems, voice agents<br />
          and intelligent backend applications.
        </p>

        <HeroTechnicalVisual />

        <div className={styles.bottom} data-hero-bottom>
          <div className={styles.scroll}>
            <span className={styles.arrow} aria-hidden="true">↓</span>
            <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
          </div>
          <span className={styles.location}>BASED IN INDIA</span>
        </div>
      </div>
    </section>
  );
}
