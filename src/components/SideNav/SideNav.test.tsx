import React from 'react';
import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import { SideNav } from './SideNav';
import { shallowToJson } from 'enzyme-to-json';

describe('render SideNav component', () => {
  test('should render SideNav component while logged in', () => {
    const mockLogout = vi.fn();
    const wrapper = shallow(
      <SideNav isLoggedIn={true} startLogout={mockLogout}></SideNav>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('should render SideNav component while logged out', () => {
    const mockLogout = vi.fn();
    const wrapper = shallow(
      <SideNav isLoggedIn={false} startLogout={mockLogout}></SideNav>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
