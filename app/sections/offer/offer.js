import React from 'react';
import style from './offer.css';
import imgCloud from './cloud.png';
import texts from '../../texts.js';
import Cards from '../../components/cards/cards.js';

export default () => (
  <section id="Erbjudande" className={style.offer}>
    <h1 className={style.title}>Vi erbjuder</h1>
    <img className={style.cloud} src={imgCloud} />

    <Cards items={texts.offer} />
  </section>
);
