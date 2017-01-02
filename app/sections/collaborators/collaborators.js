import React from 'react';
import style from './collaborators.css';
import imgKfo from './kfo.png';
import imgAiai from './aiai.png';

export default () => (
  <section className={style.collaborators}>
    <p>I sammarbete med:</p>
    <ul className={style.logos}>
      <li><img src={imgKfo} /></li>
      <li><img src={imgAiai} /></li>
    </ul>
    <p>Vi innehar tillstånd från Inspektionen för Vård och Omsorg</p>
  </section>
);
