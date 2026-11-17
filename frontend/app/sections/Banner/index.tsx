import styles from "./styles.module.css";
import { CTA } from "../../components/CTA";

export const Banner = () => (
  <section className={styles.section}>
    <CTA
      title="Vi hjälper dig!"
      buttonText="Mejla oss"
      url="mailto:info@hemmalaget.se?Subject=Bli%20kund%20hos%20Hemmalaget"
      secondary={{
        text: (
          <>
            Ring <span className={styles.number}>076-869 50 00</span>
          </>
        ),
        url: "tel:+46768695000",
      }}
    />
    <div aria-hidden="true" className={styles.image} />
  </section>
);
