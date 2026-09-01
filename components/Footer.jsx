import styles from './Footer.module.css';

const LINKS = [
  { label: 'GITHUB', href: 'https://github.com/Hafizmuhammedk' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/hafis-muhammed-k-559a54353' },
  { label: 'EMAIL', href: 'mailto:hafizmuhammed1019@gmail.com' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container} data-footer-content>
        <span className={styles.copy}>© {currentYear} HAFIS MUHAMMED. ALL RIGHTS RESERVED.</span>
        <nav className={styles.links} aria-label="Social links">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
