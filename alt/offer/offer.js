import React from 'react';
import style from './offer.css';
import imgCloud from './cloud.png';
import texts from '../texts.js';

export default () => (
  <section className={style.offer}>
    <h1 className={style.title}>Vi erbjuder</h1>
    <img className={style.cloud} src={imgCloud} />

    <ul className={style.offers}>
      {texts.offer.map(o => (
        <li key={o.title} className={style.item}>
          <h2>{o.title}</h2>
          <p>{o.text}</p>
        </li>
      ))}
    </ul>
  </section>
);
