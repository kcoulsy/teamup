import React from 'react';
import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import { shallowToJson } from 'enzyme-to-json';
import { App } from './App';

describe('render AppRouter component', () => {
  test('should render AppRouter component', () => {
    const initialise = vi.fn();
    const wrapper = shallow(<App initialise={initialise} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(initialise.mock.calls.length).toBeGreaterThan(0);
  });
});
