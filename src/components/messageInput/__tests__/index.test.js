import React from 'react';
import { shallow } from 'enzyme';
import MessageInput from '../index';

const wrapper = shallow((<MessageInput />));

describe('index', () => {
  it('should render MessageInput correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
