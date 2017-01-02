import React from 'react';
import style from './benefits.css';
import texts from '../texts.js';
import Cards from '../cards/cards.js';

export default () => (
  <section className={style.benefits}>
    <Cards items={texts.benefits} />
  </section>
);
