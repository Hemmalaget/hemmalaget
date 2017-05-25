import React from 'react';
import style from './footer.css';

const Footer = () => (
  <section id="Kontakt" className={style.footer}>
    <h1 className={style.title}>Kontakt</h1>
    <p>Org.nr: 556852-0315</p>
    <p>Telefon: <a className={style.link} href="tel:+46768595000">076 859 5000</a></p>
    <p>E-post: <a className={style.link} href="mailto:info@hemmalaget.se">info@hemmalaget.se</a></p>
    <a className={style.link} href="https://www.google.se/maps/place/Klockareg%C3%A5rdsv%C3%A4gen+9,+441+35+Alings%C3%A5s/@57.9387194,12.546462">Klockaregårdsvägen 9<br />441 35 Alingsås</a>
  </section>
);

export default Footer;
