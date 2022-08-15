import React from 'react';
import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import Home from './../Home';
import { shallowToJson } from 'enzyme-to-json';

describe('render Home component', () => {
  test('placeholder', () => {
    expect(true).toBe(true);
  });
  // TODO - update to react testing library
  //   test('should render Home page component', () => {
  //     const wrapper = shallow(<Home />);
  //     expect(shallowToJson(wrapper)).toMatchSnapshot();
  //   });
  //   // TODO - update to react testing library
  //   test('should allow modal to be toggled', () => {
  //     const wrapper = shallow(<Home />);
  //     expect(wrapper.find('Modal').prop('isActive')).toBe(true);
  //     wrapper.find('button').simulate('click', { preventDefault: vi.fn() });
  //     expect(wrapper.find('Modal').prop('isActive')).toBe(false);
  //   });
});
