//import 'babel-polyfill';

const asdf = 3;

function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = "Hello World";

  return element;
}

document.body.appendChild(component());
