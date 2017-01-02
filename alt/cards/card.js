import React from 'react';
import style from './card.css';

export default (props) => (
  <li className={style.card}>
    <h2 className={style.title}>{props.title}</h2>
    <p className={style.text}>{props.text}</p>
  </li>
);
