import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { describe, expect, test, vi } from 'vitest';
import { RegisterForm, mapStateToProps } from './RegisterForm';
import { RootState } from '../../store/configure';

describe('render login form component', () => {
  test('should render RegisterForm component', () => {
    const startRegister = vi.fn();
    const wrapper = shallow(
      <RegisterForm attemptingRegister={false} startRegister={startRegister} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('should call startRegister on submit', () => {
    const startRegister = vi.fn();
    const wrapper = shallow(
      <RegisterForm attemptingRegister={false} startRegister={startRegister} />
    );
    const testUser = {
      username: 'username',
      email: 'test@test.com',
      password: 'password1',
      confirm: 'password1',
    };
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: testUser.username } });
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: testUser.email } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('input[name="confirm"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(1);
    expect(startRegister.mock.calls[0][0]).toEqual(testUser);
  });

  test('should show errors if there are password problems', () => {
    const startRegister = vi.fn();
    const wrapper = shallow(
      <RegisterForm attemptingRegister={false} startRegister={startRegister} />
    );
    const testUser = {
      username: 'username',
      email: 'test@test.com',
      password: 'password1',
      confirm: 'password1',
    };

    // MISSING PASSWORD FIELDS
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: testUser.username } });
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: testUser.email } });
    // Not entering a password yet.
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(0);
    expect(wrapper.find('.error.message').length).toBe(1);

    expect(wrapper.find('li[data-error="password-empty"]').length).toBe(1);
    expect(wrapper.find('li[data-error="confirm-empty"]').length).toBe(1);

    // MISMATCHED PASSWORDS
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('input[name="confirm"]')
      .simulate('change', { target: { value: 'notthesame' } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(wrapper.find('li[data-error="password-mismatch"]').length).toBe(1);

    // INVALID PASSWORD (MIN LEN 3, CONTAINS NUMBER)
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: 'abc' } });
    wrapper
      .find('input[name="confirm"]')
      .simulate('change', { target: { value: 'abc' } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(wrapper.find('li[data-error="password-invalid"]').length).toBe(1);

    // VALID PASSWORD, REMOVE THE ERRORS
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('input[name="confirm"]')
      .simulate('change', { target: { value: testUser.confirm } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(1);
    expect(wrapper.find('.error.message').length).toBe(0);
  });

  test('should show errors if there are username problems', () => {
    const startRegister = vi.fn();
    const wrapper = shallow(
      <RegisterForm attemptingRegister={false} startRegister={startRegister} />
    );
    const testUser = {
      username: 'username',
      email: 'test@test.com',
      password: 'password1',
      confirm: 'password1',
    };

    // NO USERNAME ENTERED
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: '' } });
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: testUser.email } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('input[name="confirm"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(0);
    expect(wrapper.find('.error.message').length).toBe(1);
    expect(wrapper.find('form').hasClass('error')).toBe(true);

    expect(wrapper.find('li[data-error="username-empty"]').length).toBe(1);

    // INVALID USERNAME LENGTH
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: 'ab' } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(wrapper.find('.error.message').length).toBe(1);
    expect(wrapper.find('form').hasClass('error')).toBe(true);
    expect(wrapper.find('li[data-error="username-short"]').length).toBe(1);

    expect(startRegister.mock.calls.length).toBe(0);

    // VALID USERNAME
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: testUser.username } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(1);
    expect(wrapper.find('.error.message').length).toBe(0);
  });

  test('should show errors if there are email problems', () => {
    const startRegister = vi.fn();
    const wrapper = shallow(
      <RegisterForm attemptingRegister={false} startRegister={startRegister} />
    );
    const testUser = {
      username: 'username',
      email: 'test@test.com',
      password: 'password1',
      confirm: 'password1',
    };

    // NO USERNAME ENTERED
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: testUser.username } });
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: '' } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('input[name="confirm"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(0);
    expect(wrapper.find('.error.message').length).toBe(1);
    expect(wrapper.find('form').hasClass('error')).toBe(true);

    expect(wrapper.find('li[data-error="email-empty"]').length).toBe(1);

    // INVALID USERNAME LENGTH
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: 'notavalidemail' } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(wrapper.find('.error.message').length).toBe(1);
    expect(wrapper.find('form').hasClass('error')).toBe(true);
    expect(wrapper.find('li[data-error="email-invalid"]').length).toBe(1);

    expect(startRegister.mock.calls.length).toBe(0);

    // VALID USERNAME
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: testUser.email } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(1);
    expect(wrapper.find('.error.message').length).toBe(0);
  });

  test('should show errors if errorMsg is passed in as a prop', () => {
    const startRegister = vi.fn();
    const ERROR_MSG = 'Test error message';
    const wrapper = shallow(
      <RegisterForm
        attemptingRegister={false}
        startRegister={startRegister}
        errorMsg={ERROR_MSG}
      />
    );
    const testUser = {
      username: 'username',
      email: 'test@test.com',
      password: 'password1',
      confirm: 'password1',
    };

    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: testUser.username } });
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: testUser.email } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('input[name="confirm"]')
      .simulate('change', { target: { value: testUser.password } });
    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(0);
    expect(wrapper.find('.error.message').length).toBe(1);
    expect(wrapper.find('form').hasClass('error')).toBe(true);

    expect(wrapper.find('li[data-error="error-msg"]').length).toBe(1);

    wrapper.setProps({ errorMsg: null });

    wrapper
      .find('button[type="submit"]')
      .simulate('click', { preventDefault: vi.fn() });

    expect(startRegister.mock.calls.length).toBe(1);
    expect(wrapper.find('.error.message').length).toBe(0);
  });

  test('should show loader with attemptingRegister', () => {
    const startRegister = vi.fn();
    const wrapper = shallow(
      <RegisterForm startRegister={startRegister} attemptingRegister={true} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();

    expect(wrapper.find('Loader').length).toBe(1);
  });

  test('should correctly map state to props', () => {
    const mockState: RootState = {
      auth: {
        attemptingLogin: false,
        token: null,
        loginAttemptFailed: false,
        appInitialising: false,
        appInitialised: false,
        attemptingRegister: false,
        registerErrorMsg: 'error message',
      },
    };

    expect(mapStateToProps(mockState).attemptingRegister).toEqual(
      mockState.auth.attemptingRegister
    );
    expect(mapStateToProps(mockState).errorMsg).toEqual(
      mockState.auth.registerErrorMsg
    );
  });
});
