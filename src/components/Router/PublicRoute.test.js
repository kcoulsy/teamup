import React from 'react';
import { shallow } from 'enzyme';

import { PublicRoute, publicRouteRender, mapStateToProps } from './PublicRoute';
import { shallowToJson } from 'enzyme-to-json';
import isLoggedIn from '../../helpers/isLoggedIn';

describe('render PublicRoute component', () => {
    it('should render PublicRoute component', () => {
        const wrapper = shallow(<PublicRoute />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should handle publicRouteRender when logged in', () => {
        const child = <p>JSX Child</p>;
        const isLoggedIn = true;
        const wrapper = shallow(publicRouteRender(isLoggedIn, child)({ location: jest.fn() }));

        expect(wrapper.contains(child)).toBe(false);
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle publicRouteRender when not logged in', () => {
        const child = <p>JSX Child</p>;
        const isLoggedIn = false;
        const wrapper = shallow(publicRouteRender(isLoggedIn, child)({ location: jest.fn() }));

        expect(wrapper.contains(child)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('should return correct props from store', () => {
        const testStore = {
            auth: {
                token: 'testtoken',
            },
        };
        expect(mapStateToProps(testStore)).toEqual({
            isLoggedIn: isLoggedIn(testStore.auth.token),
        });
    });
});
