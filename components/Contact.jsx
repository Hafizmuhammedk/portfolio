import styles from './Contact.module.css';
import ContactDotField from './ContactDotField';
import ContactAction from './ContactAction';

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <ContactDotField />
      <div className={styles.container} data-scroll-content>
        <h2 className={styles.title} data-contact-heading>
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          INTELLIGENT.
        </h2>
        <ContactAction />
      </div>
    </section>
  );
}
