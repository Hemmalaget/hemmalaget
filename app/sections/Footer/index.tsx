import styles from "./styles.module.css";

export const Footer = () => (
  <footer className={styles.section} id="kontakt">
    <div className={styles.columns}>
      <div className={styles.group}>
        <h2 className={styles.title}>Kontakt</h2>
        <dl className={styles.details}>
          <dt>Org.nr</dt>
          <dd>556852-0315</dd>

          <dt>Telefon</dt>
          <dd>
            <a href="tel:+46768695000">076 869 5000</a>
          </dd>

          <dt>E-post</dt>
          <dd>
            <a href="mailto:info@hemmalaget.se">info@hemmalaget.se</a>
          </dd>

          <dt>Adress</dt>
          <dd>
            <a href="https://goo.gl/maps/fmYpF54PYM8hU8St8">
              Källedalsgatan 1 <br />
              521 52 Floby
            </a>
          </dd>
        </dl>
      </div>

      <div className={styles.group}>
        <h2 className={styles.title}>Information</h2>
        <div className={styles.links}>
          <a href="visselblasning">Visselblåsning</a>
        </div>
      </div>
    </div>

    <div className={styles.copyright}>
      {new Date().getFullYear()} © Hemmalaget AB
    </div>
  </footer>
);
