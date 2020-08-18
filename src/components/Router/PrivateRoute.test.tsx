import React from 'react';
import { shallow } from 'enzyme';
import { privateRouteRender, mapStateToProps, PrivateRoute } from './PrivateRoute';
import { shallowToJson } from 'enzyme-to-json';
import isLoggedIn from '../../helpers/isLoggedIn';
import { RootState } from '../../store/configure';
import * as H from 'history';
import TestComponentWrapper from './TestComponentWrapper';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe('render PrivateRoute component', () => {
    const child = <p>JSX Child</p>;
    const location: H.Location<any> = {
        pathname: '',
        search: '',
        state: '',
        hash: '',
        key: '',
    };

    it('should render PrivateRoute component', () => {
        const wrapper = shallow(<PrivateRoute isLoggedIn={false} />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should handle PrivateRouteRender when logged in', () => {
        const isLoggedIn = true;
        const wrapper = shallow(
            <TestComponentWrapper>
                {privateRouteRender(isLoggedIn, child)({ location })}
            </TestComponentWrapper>
        );

        expect(wrapper.contains(child)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle PrivateRouteRender when not logged in', () => {
        const isLoggedIn = false;
        const wrapper = shallow(
            <TestComponentWrapper>
                {privateRouteRender(isLoggedIn, child)({ location })}
            </TestComponentWrapper>
        );

        expect(wrapper.contains(child)).toBe(false);
        expect(wrapper).toMatchSnapshot();
    });

    it('should return correct props from store', () => {
        const mockState: RootState = {
            auth: {
                attemptingLogin: false,
                token: 'testtoken',
                loginAttemptFailed: false,
                appInitialising: false,
                appInitialised: false,
                attemptingRegister: false,
            },
        };

        expect(mapStateToProps(mockState)).toEqual({
            isLoggedIn: isLoggedIn(mockState.auth.token),
        });
    });
});
