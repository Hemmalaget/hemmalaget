import React, { Component } from 'react';

// Global styles
import './index.css';

import texts from './texts.js';

// Sections
import Navigation from './sections/navigation/navigation.js';
import Header from './sections/header/header.js';
import Quote from './sections/quote/quote.js';
import imgOwner from './sections/quote/owner.png';
import imgClient from './sections/quote/client.png';
import imgAssistant from './sections/quote/assistant.png';
import Regions from './sections/regions/regions.js';
import Offer from './sections/offer/offer.js';
import Contact from './sections/contact/contact.js';
import Join from './sections/join/join.js';
import Benefits from './sections/benefits/benefits.js';
import Personel from './sections/personel/personel.js';
import Collaborators from './sections/collaborators/collaborators.js';
import Footer from './sections/footer/footer.js';
import Attribution from './sections/attribution/attribution.js';


export default class App extends Component {
  render() {
    return (
      <main>
        <Navigation />
        <Header />
        <Quote reverse image={imgOwner} quote={texts.quotes.owner.quote} caption={texts.quotes.owner.caption}/>
        <Regions />
        <Offer />
        <Contact />
        <Quote image={imgClient} quote={texts.quotes.client.quote} caption={texts.quotes.client.caption}/>
        <Join />
        <Benefits />
        <Quote reverse image={imgAssistant} quote={texts.quotes.assistant.quote} caption={texts.quotes.assistant.caption}/>
        <Personel />
        <Collaborators />
        <Footer />
        <Attribution />
      </main>
    );
  }
}
