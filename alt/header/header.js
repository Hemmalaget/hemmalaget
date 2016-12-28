import React, { Component } from 'react';
import style from './header.css';

export default class Header extends Component {
  render() {
    return (
      <section className={style.header}>
        <h1 className={style.title}>Personlig assistans<br /> på dina villkor</h1>
      </section>
    );
  }
}
