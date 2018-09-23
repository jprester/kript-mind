import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

const wrapper = shallow((<Footer />));

describe('index', () => {
  it('should render Footer correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
