import React, { Component } from 'react';
import imgAssistant from './assistant.png';
import './index.css';

const Hello = ({ name }) =>  <h1> Hello {name} </h1> // Stateless/Pure component

export default class App extends Component {
  render() {
    return (
      <div>
      <Hello name={'world!'} />
      <img src={imgAssistant} />
      </div>
    );
  }
}
