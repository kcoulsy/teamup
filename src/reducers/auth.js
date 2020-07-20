import {AUTH_LOGIN_ATTEMPT, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL} from './../constants/actions';

const initialState = {
    attemptingLogin: false,
    token: null,
    attemptFailed: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_ATTEMPT:
            return Object.assign({}, state, {attemptingLogin: true, attemptFailed: false});

        case AUTH_LOGIN_SUCCESS:
            return Object.assign({}, state, {attemptingLogin: false, token: action.token, attemptFailed: false});

        case AUTH_LOGIN_FAIL:
            return Object.assign({}, state, {attemptingLogin: false, token: null, attemptFailed: true});

        default:
            return state;
    }
}
