import Image from "next/image";
import styles from "./styles.module.css";

export const Partners = () => (
  <section className={styles.section}>
    <div>I samarbete med:</div>

    <div className={styles.logos}>
      <div className={styles.badges}>
        <Image src="/aiai.png" alt="AiAi" width="81" height="96" />
        <Image
          src="/gasell-logo-rgb-krans-2023.png"
          alt="Dagens Industri Gasell 2023"
          width="67"
          height="100"
        />
      </div>
      <Image
        src="/fremia.png"
        alt="Fremia – Personlig assistans, etiska riktlinjer 2027"
        width="306"
        height="45"
      />
    </div>

    <div>Vi innehar tillstånd från Inspektionen för Vård och Omsorg</div>
  </section>
);
