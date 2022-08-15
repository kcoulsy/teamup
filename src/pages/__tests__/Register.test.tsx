import React from 'react';
import { shallow } from 'enzyme';
import { describe, expect, test } from 'vitest';
import Register from '../Register';
import { shallowToJson } from 'enzyme-to-json';

describe('render Register component', () => {
  test('should render Register page component', () => {
    const wrapper = shallow(<Register />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
