import React, { Component } from 'react';

// Global styles
import './index.css';

// Sections
import Header from './header/header.js';

export default class App extends Component {
  render() {
    return (
      <main>
        <Header />
      </main>
    );
  }
}
