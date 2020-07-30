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
} from './../constants/actions';

const initialState = {
    attemptingLogin: false,
    token: null,
    loginAttemptFailed: false,
    appInitialising: false,
    appInitialised: false,
    attemptingRegister: false,
    registerErrorMsg: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case APP_INITIALISING:
            return Object.assign({}, state, { appInitialising: true });

        case APP_INITIALISED:
            return Object.assign({}, state, { appInitialised: true, loginAttemptFailed: false });

        case AUTH_LOGIN_ATTEMPT:
            return Object.assign({}, state, { attemptingLogin: true, loginAttemptFailed: false });

        case AUTH_LOGIN_SUCCESS:
            return Object.assign({}, state, { attemptingLogin: false, token: action.token, loginAttemptFailed: false });

        case AUTH_LOGIN_FAIL:
            return Object.assign({}, state, { attemptingLogin: false, token: null, loginAttemptFailed: true });

        case AUTH_LOGOUT:
            return Object.assign({}, state, { token: null, attemptingLogin: false, loginAttemptFailed: false });

        case AUTH_REGISTER_ATTEMPT:
            return Object.assign({}, state, { attemptingRegister: true });

        case AUTH_REGISTER_SUCCESS:
            return Object.assign({}, state, { attemptingRegister: false, registerErrorMsg: null });

        case AUTH_REGISTER_FAIL:
            return Object.assign({}, state, { attemptingRegister: false, registerErrorMsg: action.errorMsg });

        default:
            return state;
    }
}
