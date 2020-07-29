import React from 'react';
import { shallow } from 'enzyme';

import { PrivateRoute, privateRouteRender, mapStateToProps } from './PrivateRoute';
import { shallowToJson } from 'enzyme-to-json';
import isLoggedIn from '../../helpers/isLoggedIn';

describe('render PrivateRoute component', () => {
    it('should render PrivateRoute component', () => {
        const wrapper = shallow(<PrivateRoute />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should handle PrivateRouteRender when logged in', () => {
        const child = <p>JSX Child</p>;
        const isLoggedIn = true;
        const wrapper = shallow(privateRouteRender(isLoggedIn, child)({ location: jest.fn() }));

        expect(wrapper.contains(child)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle PrivateRouteRender when not logged in', () => {
        const child = <p>JSX Child</p>;
        const isLoggedIn = false;
        const wrapper = shallow(privateRouteRender(isLoggedIn, child)({ location: jest.fn() }));

        expect(wrapper.contains(child)).toBe(false);
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
