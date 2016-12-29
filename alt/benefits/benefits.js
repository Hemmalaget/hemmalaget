import React from 'react';
import style from './benefits.css';
import texts from '../texts.js';

export default () => (
  <section className={style.benefits}>
    <ul className={style.list}>
      {texts.benefits.map(o => (
        <li key={o.title} className={style.item}>
          <h2>{o.title}</h2>
          <p>{o.text}</p>
        </li>
      ))}
    </ul>
  </section>
);
