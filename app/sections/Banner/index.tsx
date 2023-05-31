import Image from "next/image";
import styles from "./styles.module.css";

export const Banner = () => (
  <section className={styles.section}>
    <div role="img" aria-alt="Leende person" className={styles.image} />
    <h2 className={styles.title}>Vi hjälper dig!</h2>
    <button className={styles.button}>Kontakta oss</button>
  </section>
);
