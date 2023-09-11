import Image from "next/image";
import styles from "./styles.module.css";

export const Partners = () => (
  <section className={styles.section}>
    <div>I sammarbete med:</div>

    <div className={styles.logos}>
      <Image src="/kfo.png" alt="KFO" width="128" height="56" />
      <Image src="/aiai.png" alt="AiAi" width="81" height="96" />
    </div>

    <div>Vi innehar tillstånd från Inspektionen för Vård och Omsorg</div>
  </section>
);
