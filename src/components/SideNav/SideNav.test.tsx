import React from 'react';
import { shallow } from 'enzyme';

import { SideNav } from './SideNav';
import { shallowToJson } from 'enzyme-to-json';

describe('render SideNav component', () => {
    it('should render SideNav component while logged in', () => {
        const mockLogout = jest.fn();
        const wrapper = shallow(
            <SideNav isLoggedIn={true} startLogout={mockLogout}></SideNav>
        );

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render SideNav component while logged out', () => {
        const mockLogout = jest.fn();
        const wrapper = shallow(
            <SideNav isLoggedIn={false} startLogout={mockLogout}></SideNav>
        );

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
