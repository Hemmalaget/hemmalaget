import React from 'react';
import style from './contact.css';
import image from './natural_smile.jpg';

export default () => (
  <section className={style.contact}>
    <div className={style.banner}>
      <div className={style.image}></div>
      <div className={style.bar}>
        <h2 className={style.title}>Vi hjälper dig!</h2>
        <a className={style.button} href="mailto:asdf@asdf.com">Kontakta oss</a>
      </div>
    </div>
  </section>
);
