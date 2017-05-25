import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Card from '../app/components/cards/card.js';

const avenger = {
  class: 'card--profile',
  title: 'Anthony Edward "Tony" Stark',
  text: 'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man..'
};

test('Card renders consistently', () => {
  const component = renderer.create(
    <Card className={avenger.class} key={avenger.title} title={avenger.title} text={avenger.text} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card renders title and text', () => {
  const card = shallow(
    <Card className={avenger.class} key={avenger.title} title={avenger.title} text={avenger.text} />
  );

  expect(card.find('h2').text()).toEqual(avenger.title);
  expect(card.find('p').text()).toEqual(avenger.text);
});
