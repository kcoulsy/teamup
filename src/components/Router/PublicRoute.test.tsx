import React from 'react';
import { shallow } from 'enzyme';

import { PublicRoute, publicRouteRender, mapStateToProps } from './PublicRoute';
import { shallowToJson } from 'enzyme-to-json';
import isLoggedIn from '../../helpers/isLoggedIn';
import * as H from 'history';
import { RootState } from '../../store/configure';

describe('render PublicRoute component', () => {
    const WrapFunc : React.FunctionComponent = ({ children }) => {
        return <div>{children}</div>;
    }

    it('should render PublicRoute component', () => {
        const wrapper = shallow(<PublicRoute isLoggedIn={false} />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should handle publicRouteRender when logged in', () => {
        const child = <p>JSX Child</p>;
        const isLoggedIn = true;
        const location: H.Location<any> = {
            pathname: '',
            search: '',
            state: '',
            hash: '',
            key: ''
        }
        
        const wrapper = shallow(<WrapFunc>{publicRouteRender(isLoggedIn, child)({ location })}</WrapFunc>);

        expect(wrapper.contains(child)).toBe(false);
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle publicRouteRender when not logged in', () => {
        const child = <p>JSX Child</p>;
        const isLoggedIn = false;
        const location: H.Location<any> = {
            pathname: '',
            search: '',
            state: '',
            hash: '',
            key: ''
        }
        const wrapper = shallow(<WrapFunc>{publicRouteRender(isLoggedIn, child)({ location })}</WrapFunc>);

        expect(wrapper.contains(child)).toBe(true);
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
