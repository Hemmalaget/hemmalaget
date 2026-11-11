import styles from "./styles.module.css";
import { CTA } from "../../components/CTA";

export const Banner = () => (
  <section className={styles.section}>
    <CTA
      title="Vi hjälper dig!"
      buttonText="Mejla oss"
      url="mailto:info@hemmalaget.se?Subject=Bli%20kund%20hos%20Hemmalaget"
      // Non-breaking space and hyphen keep the number on one line
      secondary={{
        text: "Ring 076\u2011869\u00a050\u00a000",
        url: "tel:+46768695000",
      }}
    />
    <div aria-hidden="true" className={styles.image} />
  </section>
);
