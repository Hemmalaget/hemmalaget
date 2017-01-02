import React, { Component } from 'react';

// Global styles
import './index.css';

import texts from './texts.js';

// Sections
import Navigation from './navigation/navigation.js';
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
import Collaborators from './collaborators/collaborators.js';
import Footer from './footer/footer.js';
import Attribution from './attribution/attribution.js';


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
