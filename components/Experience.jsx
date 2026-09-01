import { experience } from '@/lib/data';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-title">
      <div className={styles.container} data-scroll-content>
        <h2 className="srOnly" id="experience-title">Experience</h2>
        {experience.map((item) => (
          <article key={`${item.period}-${item.role}`} className={styles.row}>
            <p className={styles.period}>{item.period}</p>
            <h3 className={styles.role}>{item.role}</h3>
            <p className={styles.description}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
