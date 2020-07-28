import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { LoginForm, mapStateToProps } from './LoginForm';

describe('render login form component', () => {
    it('should render LoginForm component', () => {
        const startLogin = jest.fn();
        const wrapper = shallow(<LoginForm startLogin={startLogin} />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should call startLogin on submit', () => {
        const startLogin = jest.fn();
        const wrapper = shallow(<LoginForm startLogin={startLogin} />);
        const testUser = {
            username: 'username',
            password: 'password',
        };
        wrapper.find('input[name="username"]').simulate('change', { target: { value: testUser.username } });
        wrapper.find('input[name="password"]').simulate('change', { target: { value: testUser.password } });
        wrapper.find('button[type="submit"]').simulate('click', { preventDefault: jest.fn() });

        expect(startLogin.mock.calls.length).toBe(1);
        expect(startLogin.mock.calls[0][0]).toBe(testUser.username);
        expect(startLogin.mock.calls[0][1]).toBe(testUser.password);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should show errors if field is empty', () => {
        const startLogin = jest.fn();
        const wrapper = shallow(<LoginForm startLogin={startLogin} />);
        const testUser = {
            username: 'username',
            password: 'password',
        };

        //testing if password is missing, show the password error
        wrapper.find('input[name="username"]').simulate('change', { target: { value: testUser.username } });
        wrapper.find('input[name="password"]').simulate('change', { target: { value: '' } });
        wrapper.find('button[type="submit"]').simulate('click', { preventDefault: jest.fn() });

        expect(startLogin.mock.calls.length).toBe(0);
        expect(wrapper.find('.error.message').length).toBe(1);
        expect(wrapper.find('.error.message').contains('Please enter a password')).toBe(true);

        // typing in that password should remove the error on click
        wrapper.find('input[name="password"]').simulate('change', { target: { value: testUser.password } });
        wrapper.find('button[type="submit"]').simulate('click', { preventDefault: jest.fn() });

        expect(startLogin.mock.calls.length).toBe(1);
        expect(wrapper.find('.error.message').length).toBe(0);

        //////////////////////

        // Now testing if username is missing, show the username error
        wrapper.find('input[name="username"]').simulate('change', { target: { value: '' } });
        wrapper.find('input[name="password"]').simulate('change', { target: { value: testUser.password } });
        wrapper.find('button[type="submit"]').simulate('click', { preventDefault: jest.fn() });

        expect(startLogin.mock.calls.length).toBe(1); // still 1 from testing password
        expect(wrapper.find('.error.message').length).toBe(1);
        expect(wrapper.find('form').hasClass('error')).toBe(true);
        expect(wrapper.find('.error.message').contains('Please enter a username')).toBe(true);

        // typing in that username should remove the error on click
        wrapper.find('input[name="username"]').simulate('change', { target: { value: testUser.username } });
        wrapper.find('button[type="submit"]').simulate('click', { preventDefault: jest.fn() });

        expect(startLogin.mock.calls.length).toBe(2);
        expect(wrapper.find('.error.message').length).toBe(0);
    });

    it('should show error login attempt failed', () => {
        const startLogin = jest.fn();
        const wrapper = shallow(<LoginForm startLogin={startLogin} loginAttemptFailed={false} />);

        expect(wrapper.find('.error.message').length).toBe(0);

        wrapper.setProps({ loginAttemptFailed: true });
        expect(wrapper.find('.error.message').length).toBe(1);
        expect(wrapper.find('.error.message').contains('Login Invalid')).toBe(true);
    });

    it('should correctly map state to props', () => {
        const mockState = {
            auth: {
                attemptingLogin: false,
                loginAttemptFailed: false,
            },
        };

        expect(mapStateToProps(mockState).attemptingLogin).toEqual(mockState.auth.attemptingLogin);
        expect(mapStateToProps(mockState).loginAttemptFailed).toEqual(mockState.auth.loginAttemptFailed);
    });
});
