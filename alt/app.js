import React, { Component } from 'react';

// Global styles
import './index.css';

import texts from './texts.js';

// Sections
import Header from './header/header.js';

import Quote from './quote/quote.js';
import imgOwner from './quote/owner.png';
import imgClient from './quote/client.png';
import imgAssistant from './quote/assistant.png';

import Regions from './regions/regions.js';


export default class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Quote image={imgOwner} quote={texts.quotes.owner.quote} caption={texts.quotes.owner.caption}/>
        <Regions />
        <Quote image={imgClient} quote={texts.quotes.client.quote} caption={texts.quotes.client.caption}/>
        <Quote image={imgAssistant} quote={texts.quotes.assistant.quote} caption={texts.quotes.assistant.caption}/>
      </main>
    );
  }
}
