import React from 'react';
import style from './quote.css';

export default (props) => (
  <section className={style.quote}>
    <img className={style.image} src={props.image}/>
		<figure className={style.figure}>
			<blockquote>{props.quote}</blockquote>
			<figcaption>{props.caption}</figcaption>
    </figure>
  </section>
);
