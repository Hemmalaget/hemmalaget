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
import Offer from './offer/offer.js';
import Contact from './contact/contact.js';
import Join from './join/join.js';
import Benefits from './benefits/benefits.js';
import Personel from './personel/personel.js';


export default class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Quote image={imgOwner} quote={texts.quotes.owner.quote} caption={texts.quotes.owner.caption}/>
        <Regions />
        <Offer />
        <Contact />
        <Quote image={imgClient} quote={texts.quotes.client.quote} caption={texts.quotes.client.caption}/>
        <Join />
        <Benefits />
        <Quote image={imgAssistant} quote={texts.quotes.assistant.quote} caption={texts.quotes.assistant.caption}/>
        <Personel />
      </main>
    );
  }
}
