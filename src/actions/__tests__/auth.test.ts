import {
  AUTH_LOGIN_ATTEMPT,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  APP_INITIALISED,
  APP_INITIALISING,
  AUTH_LOGOUT,
  AUTH_REGISTER_ATTEMPT,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
} from '../../types/actions';

import {
  loginAttempt,
  loginSuccess,
  loginFail,
  logout,
  registerAttempt,
  registerSuccess,
  registerFail,
  startLogin,
  startLogout,
  startRegister,
} from '../auth';
import { describe, expect, test, vi } from 'vitest';

import { testUsers } from '../../services/__mocks__/api';
import { appInitialised, appInitialising, initialise } from '../initialise';
vi.mock('./../../services/api');

const mockGetLocalStorage = vi.fn();

describe('auth actions INITIALISE', () => {
  test('should not initialise if already initialising', () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    getState.mockReturnValueOnce({
      auth: {
        appInitialising: true,
      },
    });

    const startInitialiseDispatch = initialise();

    startInitialiseDispatch(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test('should create an action to initialize app no token', () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    getState.mockReturnValueOnce({
      auth: {
        appInitialising: false,
      },
    });

    const startInitialiseDispatch = initialise();

    vi.stubGlobal('localStorage', mockGetLocalStorage);

    startInitialiseDispatch(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(appInitialising());

    expect(mockGetLocalStorage).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(loginAttempt());
    // NO TOKEN SO FAIL AND INITIALISED
    expect(dispatch).toHaveBeenCalledWith(loginFail());
    expect(dispatch).toHaveBeenCalledWith(appInitialised());
  });

  test('should create an action to initialize app with valid token', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const token = testUsers[0].token;

    getState.mockReturnValueOnce({
      auth: {
        appInitialising: false,
      },
    });

    const startInitialiseDispatch = initialise();

    vi.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
      function () {
        return token;
      }
    );

    await startInitialiseDispatch(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(appInitialising());
    expect(global.localStorage.getItem).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(loginAttempt());

    // TOKEN FOUND
    expect(dispatch).toHaveBeenCalledWith(loginSuccess(token));
    expect(dispatch).toHaveBeenCalledWith(appInitialised());
  });

  test('should create an action to initialize app without valid token', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    getState.mockReturnValueOnce({
      auth: {
        appInitialising: false,
      },
    });

    const startInitialiseDispatch = initialise();

    vi.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
      function () {
        return 'invalidtoken';
      }
    );

    await startInitialiseDispatch(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(appInitialising());
    expect(global.localStorage.getItem).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(loginAttempt());

    // TOKEN FOUND
    expect(dispatch).toHaveBeenCalledWith(loginFail());
    expect(dispatch).toHaveBeenCalledWith(appInitialised());
  });

  test('should create an action creator to set app initialised', () => {
    expect(appInitialised()).toEqual({
      type: APP_INITIALISED,
    });
  });

  test('should create an action creator to set app initialising', () => {
    expect(appInitialising()).toEqual({
      type: APP_INITIALISING,
    });
  });
});

describe('auth actions LOGIN', () => {
  test('should create an action to startLogin with success', async () => {
    const dispatch = vi.fn();
    const { username, password, token } = testUsers[0];
    const startLoginDispatch = startLogin(username, password);

    await startLoginDispatch(dispatch);

    expect(dispatch).toHaveBeenCalledWith(loginAttempt());
    expect(dispatch).toHaveBeenCalledWith(loginSuccess(token));
  });

  test('should create an action to startLogin with fail', async () => {
    const dispatch = vi.fn();
    const startLoginDispatch = startLogin('invalidusername', 'password');

    await startLoginDispatch(dispatch);

    expect(dispatch).toHaveBeenCalledWith(loginAttempt());
    expect(dispatch).toHaveBeenCalledWith(loginFail());
  });

  test('should create an action to startLogin with api falling over', async () => {
    const dispatch = vi.fn();
    const startLoginDispatch = startLogin('APIFALLOVER', '123');

    await startLoginDispatch(dispatch);

    expect(dispatch).toHaveBeenCalledWith(loginAttempt());
    expect(dispatch).toHaveBeenCalledWith(loginFail());
  });

  test('should create an action creator to set login attempt', () => {
    expect(loginAttempt()).toEqual({
      type: AUTH_LOGIN_ATTEMPT,
    });
  });

  test('should create an action creator to set login success', () => {
    const testToken = testUsers[0].token;

    vi.spyOn(global.localStorage.__proto__, 'setItem');

    expect(loginSuccess(testToken)).toEqual({
      type: AUTH_LOGIN_SUCCESS,
      token: testToken,
    });

    expect(global.localStorage.setItem).toHaveBeenCalled();
  });

  test('should create an action creator to set login fail', () => {
    vi.spyOn(global.localStorage.__proto__, 'removeItem');
    expect(loginFail()).toEqual({
      type: AUTH_LOGIN_FAIL,
    });
    expect(global.localStorage.removeItem).toHaveBeenCalled();
  });
});

describe('auth actions LOGOUT', () => {
  test('should create an action to logout', () => {
    vi.spyOn(global.localStorage.__proto__, 'removeItem');
    const logoutDispatch = startLogout();
    const dispatch = vi.fn();

    logoutDispatch(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: AUTH_LOGOUT });
    expect(global.localStorage.removeItem).toHaveBeenCalled();
  });

  test('should create an action creator to set logout', () => {
    expect(logout()).toEqual({
      type: AUTH_LOGOUT,
    });
  });
});

describe('auth actions REGISTER', () => {
  test('should create an action to startRegister with success', async () => {
    const dispatch = vi.fn();
    const startRegisterDispatch = startRegister({
      username: 'testuser',
      email: 'test@test.com',
      password: '123',
      confirm: '123',
    });

    await startRegisterDispatch(dispatch);

    expect(dispatch).toHaveBeenCalledWith(registerAttempt());
    expect(dispatch).toHaveBeenCalledWith(registerSuccess());
  });

  test('should create an action to startRegister with fail', async () => {
    const dispatch = vi.fn();
    const startRegisterDispatch = startRegister({
      username: testUsers[0].username, // mock api will fail with this username
      email: 'test@test.com',
      password: '123',
      confirm: '123',
    });

    await startRegisterDispatch(dispatch);

    expect(dispatch).toHaveBeenCalledWith(registerAttempt());
    expect(dispatch).toHaveBeenCalledWith(registerFail('REGISTERFAIL'));
  });

  test('should create an action to startRegister with api falling over', async () => {
    const dispatch = vi.fn();
    const startRegisterDispatch = startRegister({
      username: 'APIFALLOVER',
      email: 'test@test.com',
      password: '123',
      confirm: '123',
    });

    await startRegisterDispatch(dispatch);

    expect(dispatch).toHaveBeenCalledWith(registerAttempt());
    expect(dispatch).toHaveBeenCalledWith(registerFail('Something went wrong'));
  });

  test('should create an action creator to set register attempt', () => {
    expect(registerAttempt()).toEqual({
      type: AUTH_REGISTER_ATTEMPT,
    });
  });

  test('should create an action creator to set register success', () => {
    expect(registerSuccess()).toEqual({
      type: AUTH_REGISTER_SUCCESS,
    });
  });

  test('should create an action creator to set register fail', () => {
    const testErrorMessage = 'test error message';

    expect(registerFail(testErrorMessage)).toEqual({
      type: AUTH_REGISTER_FAIL,
      errorMsg: testErrorMessage,
    });
  });
});
