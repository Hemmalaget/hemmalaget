import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './card.css';

const Card = ({className, title, text}) => (
  <li className={classnames(className, style.card)}>
  <h2 className={style.title}>{title}</h2>
  <p className={style.text}>{text}</p>
  </li>
);

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.required,
  text: PropTypes.string.required
};

export default Card;
