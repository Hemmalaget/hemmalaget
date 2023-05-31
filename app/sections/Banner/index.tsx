import Image from "next/image";
import styles from "./styles.module.css";
import { CTA } from "../../components/CTA";

export const Banner = () => (
  <section className={styles.section}>
    <div role="img" aria-label="Leende person" className={styles.image} />
    <CTA
      title="Vi hjälper dig!"
      buttonText="Kontakta oss"
      url="mailto:info@hemmalaget.se?Subject=Bli%20kund%20hos%20Hemmalaget"
    />
  </section>
);
