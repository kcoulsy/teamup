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
    initialise,
    appInitialised,
    appInitialising,
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

import { testUsers } from '../../services/__mocks__/api';
jest.mock('./../../services/api');

describe('auth actions INITIALISE', () => {
    it('should not initialise if already initialising', () => {
        const dispatch = jest.fn();
        const getState = jest.fn();

        getState.mockReturnValueOnce({
            auth: {
                appInitialising: true,
            },
        });

        const startInitialiseDispatch = initialise();

        startInitialiseDispatch(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it('should create an action to initialize app no token', () => {
        const dispatch = jest.fn();
        const getState = jest.fn();

        getState.mockReturnValueOnce({
            auth: {
                appInitialising: false,
            },
        });

        const startInitialiseDispatch = initialise();

        jest.spyOn(global.localStorage.__proto__, 'getItem');

        startInitialiseDispatch(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(appInitialising());

        expect(global.localStorage.getItem).toHaveBeenCalled();

        expect(dispatch).toHaveBeenCalledWith(loginAttempt());
        // NO TOKEN SO FAIL AND INITIALISED
        expect(dispatch).toHaveBeenCalledWith(loginFail());
        expect(dispatch).toHaveBeenCalledWith(appInitialised());
    });

    it('should create an action to initialize app with valid token', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const token = testUsers[0].token;

        getState.mockReturnValueOnce({
            auth: {
                appInitialising: false,
            },
        });

        const startInitialiseDispatch = initialise();

        jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
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

    it('should create an action to initialize app without valid token', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();

        getState.mockReturnValueOnce({
            auth: {
                appInitialising: false,
            },
        });

        const startInitialiseDispatch = initialise();

        jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
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

    it('should create an action creator to set app initialised', () => {
        expect(appInitialised()).toEqual({
            type: APP_INITIALISED,
        });
    });

    it('should create an action creator to set app initialising', () => {
        expect(appInitialising()).toEqual({
            type: APP_INITIALISING,
        });
    });
});

describe('auth actions LOGIN', () => {
    it('should create an action to startLogin with success', async () => {
        const dispatch = jest.fn();
        const { username, password, token } = testUsers[0];
        const startLoginDispatch = startLogin(username, password);

        await startLoginDispatch(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loginAttempt());
        expect(dispatch).toHaveBeenCalledWith(loginSuccess(token));
    });

    it('should create an action to startLogin with fail', async () => {
        const dispatch = jest.fn();
        const startLoginDispatch = startLogin('invalidusername', 'password');

        await startLoginDispatch(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loginAttempt());
        expect(dispatch).toHaveBeenCalledWith(loginFail());
    });

    it('should create an action to startLogin with api falling over', async () => {
        const dispatch = jest.fn();
        const startLoginDispatch = startLogin('APIFALLOVER', '123');

        await startLoginDispatch(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loginAttempt());
        expect(dispatch).toHaveBeenCalledWith(loginFail());
    });

    it('should create an action creator to set login attempt', () => {
        expect(loginAttempt()).toEqual({
            type: AUTH_LOGIN_ATTEMPT,
        });
    });

    it('should create an action creator to set login success', () => {
        const testToken = testUsers[0].token;

        jest.spyOn(global.localStorage.__proto__, 'setItem');

        expect(loginSuccess(testToken)).toEqual({
            type: AUTH_LOGIN_SUCCESS,
            token: testToken,
        });

        expect(global.localStorage.setItem).toHaveBeenCalled();
    });

    it('should create an action creator to set login fail', () => {
        jest.spyOn(global.localStorage.__proto__, 'removeItem');
        expect(loginFail()).toEqual({
            type: AUTH_LOGIN_FAIL,
        });
        expect(global.localStorage.removeItem).toHaveBeenCalled();
    });
});

describe('auth actions LOGOUT', () => {
    it('should create an action to logout', () => {
        jest.spyOn(global.localStorage.__proto__, 'removeItem');
        const logoutDispatch = startLogout();
        const dispatch = jest.fn();

        logoutDispatch(dispatch);
        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: AUTH_LOGOUT });
        expect(global.localStorage.removeItem).toHaveBeenCalled();
    });

    it('should create an action creator to set logout', () => {
        expect(logout()).toEqual({
            type: AUTH_LOGOUT,
        });
    });
});

describe('auth actions REGISTER', () => {
    it('should create an action to startRegister with success', async () => {
        const dispatch = jest.fn();
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

    it('should create an action to startRegister with fail', async () => {
        const dispatch = jest.fn();
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

    it('should create an action to startRegister with api falling over', async () => {
        const dispatch = jest.fn();
        const startRegisterDispatch = startRegister({
            username: 'APIFALLOVER',
            email: 'test@test.com',
            password: '123',
            confirm: '123',
        });

        await startRegisterDispatch(dispatch);

        expect(dispatch).toHaveBeenCalledWith(registerAttempt());
        expect(dispatch).toHaveBeenCalledWith(
            registerFail('Something went wrong')
        );
    });

    it('should create an action creator to set register attempt', () => {
        expect(registerAttempt()).toEqual({
            type: AUTH_REGISTER_ATTEMPT,
        });
    });

    it('should create an action creator to set register success', () => {
        expect(registerSuccess()).toEqual({
            type: AUTH_REGISTER_SUCCESS,
        });
    });

    it('should create an action creator to set register fail', () => {
        const testErrorMessage = 'test error message';

        expect(registerFail(testErrorMessage)).toEqual({
            type: AUTH_REGISTER_FAIL,
            errorMsg: testErrorMessage,
        });
    });
});
