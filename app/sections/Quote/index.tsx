import Image from "next/image";
import styles from "./styles.module.css";

export const Quote = ({
  src,
  alt,
  quote,
  quotee,
}: {
  src: string;
  alt: string;
  quote: string;
  quotee: string;
}) => (
  <section className={styles.section}>
    <div className={styles.layout}>
      <Image
        src={src}
        alt={alt}
        width="300"
        height="300"
        className={styles.image}
      />
      <figure className={styles.figure}>
        <q>{quote}</q>
        <figcaption>{quotee}</figcaption>
      </figure>
    </div>
  </section>
);
