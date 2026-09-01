import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={styles.container} data-scroll-content>
        <div className={styles.grid}>
          <div className={styles.labelCol}>
            <span className={styles.label}>ABOUT ENGINEER</span>
          </div>
          <div className={styles.contentCol}>
            <h2 className={styles.headline} id="about-title">
              I ENGINEER SYSTEMS THAT BRIDGE THE GAP BETWEEN THEORETICAL MACHINE LEARNING AND
              PRODUCTION-READY INFRASTRUCTURE.
            </h2>
            <div className={styles.bodyGrid}>
              <p className={styles.body}>
                My focus lies in building scalable architectures for AI applications. I prioritize
                clean code, deterministic behavior, and systems that can handle edge cases without
                catastrophic failure.
              </p>
              <p className={styles.body}>
                Based in India, I collaborate globally to deploy models that require low latency and
                high reliability, stripping away unnecessary complexity to leave only what is
                essential for performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
