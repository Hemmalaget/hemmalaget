import React from 'react';
import style from './cards.css';
import Card from './card.js';

export default (props) => (
  <ul className={style.cards}>
    {props.items.map(o => <Card className={style.item} key={o.title} title={o.title} text={o.text} />)}
  </ul>
);
