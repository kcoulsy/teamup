import {AUTH_LOGIN_ATTEMPT, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL} from './../constants/actions';
import authService from './../services/authentication';

export const startLogin = (username, password) => {
    return async (dispatch, getState) => {
        dispatch(loginAttempt());

        try {
            const token = await authService.login(username, password);
            if (token) {
                dispatch(loginSuccess(token));
            } else {
                dispatch(loginFail());
            }
        } catch (err) {
            dispatch(loginFail());
        }
    };
};

function loginAttempt() {
    return {
        type: AUTH_LOGIN_ATTEMPT,
    };
}

function loginSuccess(token) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        token,
    };
}

function loginFail() {
    return {
        type: AUTH_LOGIN_FAIL,
    };
}
