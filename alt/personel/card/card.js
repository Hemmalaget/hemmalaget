import React from 'react';
import style from './card.css';

const makePhoneNumber = number => number ? number.split(/\s/).join('') : '';

export default (props) => (
  <div className={style.card}>
    <img className={style.portrait} src={props.portrait} />
    <h2 className={style.fullname}>{props.fullname}</h2>
    <h3 className={style.title}>{props.title}</h3>
    <a className={style.contactLink} href={'mailto:' + props.email}>{props.email}</a>
    <a className={style.contactLink} href={'tel:' + makePhoneNumber(props.phone)}>{props.phone}</a>
    <p className={style.description}>{props.description}</p>
  </div>
);
