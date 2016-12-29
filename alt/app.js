import React, { Component } from 'react';

// Global styles
import './index.css';

import texts from './texts.js';

// Sections
import Header from './header/header.js';

import Quote from './quote/quote.js';
import PA from './quote/per-arne.png';

export default class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Quote image={PA} quote={texts.quotes.PA.quote} caption={texts.quotes.PA.caption}/>
      </main>
    );
  }
}
