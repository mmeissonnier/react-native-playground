import React from 'react';
import { shallow } from 'enzyme';
import NumberListItem from '../src/components/listItems/NumberListItem';

test('It should render correctly', () => {
  expect(shallow(<NumberListItem id="1" label="Foo" />)).toMatchSnapshot();
});
