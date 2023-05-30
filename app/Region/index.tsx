import styles from "./styles.module.css";

export const Region = ({ title, text }: { title: string; text: string }) => (
  <section className={styles.section}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.text}>{text}</p>
  </section>
);
