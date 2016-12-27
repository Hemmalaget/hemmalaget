//import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './index.css';
import App from './app.js';

const mountpoint = document.getElementById('root');

ReactDOM.render(
  <AppContainer><App /></AppContainer>,
  mountpoint
);

// Enable hot reloading
if (module.hot) {
  module.hot.accept('./app.js', () => {
    const NextApp = require('./app.js').default;
    ReactDOM.render(
      <AppContainer><NextApp /></AppContainer>,
      mountpoint
    );
  });
}
