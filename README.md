# Hemmalaget

[![Build Status](https://travis-ci.org/Hemmalaget/hemmalaget.svg?branch=master)](https://travis-ci.org/Hemmalaget/hemmalaget)
[![dependencies Status](https://david-dm.org/hemmalaget/hemmalaget/status.svg)](https://david-dm.org/hemmalaget/hemmalaget)
[![Greenkeeper badge](https://badges.greenkeeper.io/Hemmalaget/hemmalaget.svg)](https://greenkeeper.io/)

A static homepage for Hemmalaget AB, built with React, Express, Webpack and hosted on Github Pages.

## Design goal

The repository architecture is optimized for infrequent edits over a long lifetime. This leads to a number of design goals:

* Use standardized languages and tools with long-term relevancy and support.
* Modularize and limit the relevant context knowledge necessary to make changes and publish them.

Furthermore, considering the site's user base, universal accessibility is a major priority:

* Make sure usability and clarity is high and that tools such as screen readers and keyboard navigation are well supported.

## Architecture

The website is built around a handful tools and frameworks:

1. **React** - for defining modular web components
2. **Webpack** - for managing the build process
3. **Express** - as a dev server with hot code reloading using _webpack-dev-server_
4. **Node** - underlying runtime for development tools
5. **Github** - for hosting the git repository and static site deployment

The actual website code is contained in the `app/`-directory. Files on the first level pertains to the application as a whole and includes entrypoints and global layout and styles. Specifically, `app.js` defines the main React component that's mounted into `index.html`. Moreover, `common.css` defines a couple of variables and style-mixins that are used across the codebase.

The next level splits the components into `sections/` - meant to be a standalone part of `app.js` - and `components/` - meant to be used as part of sections and other components. Each subfolder within defines their own module which is supposed to be as disconnected as possible with dependencies explicitly defined.

Each module is responsible for its own assets, notably including it's own css. This project makes use of Webpack's `css-loader` module-feature, meaning styles are local to a given element and its children allowing for fully modular css.

## Requirements

1. Node
2. Npm
3. Git

I won't go into installation instructions as there's plenty of more up-to-date information about this online already.

Your system needs to have libpng installed. On Mac:

```bash
brew install libpng
```

## Development

The below commands will install dependencies, start a development server with hot reload and finally open a tab in your web browser of choice.

```bash
npm start
open http://localhost:3000
```

Most changes to the code should be instantaneously and automatically updated in your browser, but you might occasionally need to reload manually after errors.

## Testing

As this is a static webpage, there's frankly not a lot of behavior to test. There are however a couple of gratuitous tests using Jest which can be run with

```bash
npm test
```

## Deployment

The website is automatically deployed by Travis-CI whenever a new version of the `master` branch is pushed to Github.

# Made by

[Daniel Ström](https://www.linkedin.com/in/dnjstrom/)
