import styles from "./styles.module.css";

export const Footer = () => (
  <footer className={styles.section}>
    <div className={styles.copyright}>
      {new Date().getFullYear()} © Hemmalaget AB
    </div>
  </footer>
);
