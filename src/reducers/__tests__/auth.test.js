import {
    AUTH_LOGIN_ATTEMPT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    APP_INITIALISING,
    APP_INITIALISED,
    AUTH_LOGOUT,
    AUTH_REGISTER_ATTEMPT,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAIL,
} from './../../constants/actions';

import reducer from './../auth';

describe('auth reducer', () => {
    const initialStateSearch = {
        attemptingLogin: false,
        token: null,
        loginAttemptFailed: false,
        appInitialising: false,
        appInitialised: false,
        attemptingRegister: false,
        registerErrorMsg: null,
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialStateSearch);
    });

    it('should handle APP_INITIALISING', () => {
        expect(
            reducer(initialStateSearch, {
                type: APP_INITIALISING,
            })
        ).toEqual({ ...initialStateSearch, appInitialising: true });
    });

    it('should handle APP_INITIALISED', () => {
        expect(
            reducer(initialStateSearch, {
                type: APP_INITIALISED,
            })
        ).toEqual({ ...initialStateSearch, appInitialising: false, appInitialised: true, loginAttemptFailed: false });
    });

    it('should handle AUTH_LOGIN_ATTEMPT', () => {
        expect(
            reducer(initialStateSearch, {
                type: AUTH_LOGIN_ATTEMPT,
            })
        ).toEqual({ ...initialStateSearch, attemptingLogin: true, loginAttemptFailed: false });
    });

    it('should handle AUTH_LOGIN_SUCCESS', () => {
        const testToken = 'testtoken';
        expect(
            reducer(initialStateSearch, {
                type: AUTH_LOGIN_SUCCESS,
                token: testToken,
            })
        ).toEqual({ ...initialStateSearch, attemptingLogin: false, loginAttemptFailed: false, token: testToken });
    });

    it('should handle AUTH_LOGIN_FAIL', () => {
        expect(
            reducer(initialStateSearch, {
                type: AUTH_LOGIN_FAIL,
            })
        ).toEqual({ ...initialStateSearch, attemptingLogin: false, loginAttemptFailed: true, token: null });
    });

    it('should handle AUTH_LOGOUT', () => {
        expect(
            reducer(initialStateSearch, {
                type: AUTH_LOGOUT,
            })
        ).toEqual({ ...initialStateSearch, attemptingLogin: false, loginAttemptFailed: false, token: null });
    });

    it('should handle AUTH_REGISTER_ATTEMPT', () => {
        expect(
            reducer(initialStateSearch, {
                type: AUTH_REGISTER_ATTEMPT,
            })
        ).toEqual({ ...initialStateSearch, attemptingRegister: true });
    });

    it('should handle AUTH_REGISTER_SUCCESS', () => {
        expect(
            reducer(initialStateSearch, {
                type: AUTH_REGISTER_SUCCESS,
            })
        ).toEqual({ ...initialStateSearch, attemptingRegister: false, registerErrorMsg: null });
    });

    it('should handle AUTH_REGISTER_FAIL', () => {
        const errorMsg = 'test error message';
        expect(
            reducer(initialStateSearch, {
                type: AUTH_REGISTER_FAIL,
                errorMsg,
            })
        ).toEqual({ ...initialStateSearch, attemptingRegister: false, registerErrorMsg: errorMsg });
    });
});
