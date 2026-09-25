import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  return (
    <nav className={styles.nav} id="navbar" aria-label="Primary navigation">
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          HAFIS MUHAMMED
        </a>
        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
