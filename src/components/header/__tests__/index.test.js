import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

const wrapper = shallow((<Header />));

describe('index', () => {
  it('should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
