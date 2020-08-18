import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavBar, mapStateToProps } from './NavBar';
import { RootState } from '../../store/configure';

describe('NavBar component tests', () => {
    it('should render correctly', () => {
        const startLogout = jest.fn();
        const wrapper = shallow(<NavBar isLoggedIn={false} startLogout={startLogout} />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('shoulder render log in and logout if not logged in', () => {
        const startLogout = jest.fn();
        const wrapper = shallow(<NavBar startLogout={startLogout} isLoggedIn={false} />);

        expect(wrapper.find('Link[to="/login"]').length).toBe(1);
        expect(wrapper.find('Link[to="/register"]').length).toBe(1);
        expect(wrapper.find('Link[to="/secret"]').length).toBe(0);
        expect(wrapper.find('a[id="logout"]').length).toBe(0);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('shoulder render logout if logged in', () => {
        const startLogout = jest.fn();
        const wrapper = shallow(<NavBar startLogout={startLogout} isLoggedIn={true} />);

        expect(wrapper.find('Link[to="/login"]').length).toBe(0);
        expect(wrapper.find('Link[to="/register"]').length).toBe(0);
        expect(wrapper.find('Link[to="/secret"]').length).toBe(1);
        expect(wrapper.find('a[id="logout"]').length).toBe(1);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('clicking logout should log out', () => {
        const startLogout = jest.fn();
        const wrapper = shallow(<NavBar startLogout={startLogout} isLoggedIn={true} />);

        expect(wrapper.find('Link[to="/login"]').length).toBe(0);
        expect(wrapper.find('Link[to="/register"]').length).toBe(0);
        expect(wrapper.find('Link[to="/secret"]').length).toBe(1);
        expect(wrapper.find('a[id="logout"]').length).toBe(1);

        wrapper.find('a[id="logout"]').simulate('click', { preventDefault: jest.fn() });

        expect(startLogout.mock.calls.length).toBe(1);

        wrapper.setProps({ isLoggedIn: false });

        expect(wrapper.find('Link[to="/login"]').length).toBe(1);
        expect(wrapper.find('Link[to="/register"]').length).toBe(1);
        expect(wrapper.find('Link[to="/secret"]').length).toBe(0);
        expect(wrapper.find('a[id="logout"]').length).toBe(0);
    });

    it('mapStateToProps should return isLoggedIn prop', () => {
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

        expect(mapStateToProps(mockState).isLoggedIn).toBe(true);
    });
});
