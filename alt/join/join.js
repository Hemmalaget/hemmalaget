import React from 'react';
import style from './join.css';

export default () => (
  <section className={style.join}>
    <div className={style.description}>
      <h2>Vill du bli en del av Hemmalaget?</h2>
      <p>Vi är måna om att erbjuda hög service till både kunder och anställda eftersom vi vet att bra personliga assistenter är en förutsättning för bra personlig assistans. Därför vill vi vara en riktigt bra arbetsgivare och arbeta för goda relationer med varje medarbetare. Vi vill att du ska trivas och stanna hos oss!</p>
    </div>
    <div className={style.banner}>
      <h2>Skicka ditt CV och Personligt Brev till oss</h2>
      <a className={style.button}>Ansök nu!</a>
    </div>
  </section>
);
