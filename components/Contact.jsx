import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container} data-scroll-content>
        <h2 className={styles.title} data-contact-heading>
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          INTELLIGENT.
        </h2>
        <a
          href="mailto:hafizmuhammed1019@gmail.com"
          className={styles.cta}
          data-contact-action
          aria-label="Email Hafis Muhammed"
        >
          INITIATE PROTOCOL
        </a>
      </div>
    </section>
  );
}
