import React from 'react';
import classnames from 'classnames';
import style from './card.css';

export default (props) => (
  <li className={classnames(props.className, style.card)}>
    <h2 className={style.title}>{props.title}</h2>
    <p className={style.text}>{props.text}</p>
  </li>
);
