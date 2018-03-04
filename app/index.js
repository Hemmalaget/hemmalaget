/*
 * This file defines the main mount point for the react app and
 * sets everything up for hot reloading. It's written in very general
 * terms to allow reuse in other apps. The actual website is instead
 * fully contained within the "App"-module and its child components.
 */

//import 'babel-polyfill'; // Uncomment this to allow modern features in legacy browsers if necessary.

import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import App from "./app.js"

import "file-loader?name=[name].[ext]!./index.html"

const mountpoint = document.getElementById("root")

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  mountpoint
)

// Enable hot reloading
if (module.hot) {
  module.hot.accept("./app.js", () => {
    const ChangedApp = require("./app.js").default
    ReactDOM.render(
      <AppContainer>
        <ChangedApp />
      </AppContainer>,
      mountpoint
    )
  })
}
