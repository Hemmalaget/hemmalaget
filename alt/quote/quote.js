import React from 'react';
import classnames from 'classnames';
import style from './quote.css';

export default (props) => (
  <section className={classnames(style.quote, {[style.reverse]: props.reverse})}>
    <img className={style.image} src={props.image}/>
		<figure className={style.figure}>
			<blockquote>{props.quote}</blockquote>
			<figcaption>{props.caption}</figcaption>
    </figure>
  </section>
);
