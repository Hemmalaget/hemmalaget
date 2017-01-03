import React from 'react';
import style from './contact.css';
import image from './natural_smile.jpg';

export default () => (
  <section className={style.contact}>
    <div className={style.banner}>
      <div className={style.image} role="image" aria-label="Vi hjälper dig!"></div>
      <div className={style.bar}>
        <h1 className={style.title}>Vi hjälper dig</h1>
        <a className={style.button} href="mailto:info@hemmalaget.se?Subject=Bli%20kund%20hos%20Hemmalaget">Kontakta oss!</a>
      </div>
    </div>
  </section>
);
