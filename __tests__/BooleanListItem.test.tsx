import React from 'react';
import { shallow } from 'enzyme';
import BooleanListItem from '../src/components/listItems/BooleanListItem';

test('It should render correctly', () => {
  expect(
    shallow(<BooleanListItem id="1" label="Bar" value={true} />)
  ).toMatchSnapshot();
});
