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
} from './../constants/actions';
import { api } from './../services/api';

export const initialise = () => {
    return async (dispatch, getState) => {
        if (getState().auth.appInitialising) return;

        dispatch(appInitialising());

        const token = localStorage.getItem('userToken');

        dispatch(loginAttempt());

        if (typeof token === 'string') {
            const response = await api('auth/verify', 'GET');

            if (response.valid) {
                dispatch(loginSuccess(token));
                dispatch(appInitialised());
            } else {
                dispatch(loginFail());
                dispatch(appInitialised());
            }
        } else {
            dispatch(loginFail());
            dispatch(appInitialised());
        }
    };
};

export function appInitialised() {
    return {
        type: APP_INITIALISED,
    };
}

export function appInitialising() {
    return {
        type: APP_INITIALISING,
    };
}

export const startLogin = (username, password) => {
    return async (dispatch) => {
        dispatch(loginAttempt());

        try {
            const { token } = await api('auth/login', 'POST', { username, password });

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

export function loginAttempt() {
    return {
        type: AUTH_LOGIN_ATTEMPT,
    };
}

export function loginSuccess(token) {
    localStorage.setItem('userToken', token);
    return {
        type: AUTH_LOGIN_SUCCESS,
        token,
    };
}

export function loginFail() {
    localStorage.removeItem('userToken');
    return {
        type: AUTH_LOGIN_FAIL,
    };
}

export const startLogout = () => {
    return async (dispatch) => {
        // TODO: call api here and remove any tokens from the user.
        localStorage.removeItem('userToken');
        dispatch(logout());
    };
};

export function logout() {
    return {
        type: AUTH_LOGOUT,
    };
}

export const startRegister = ({ username, email, password, confirm }) => {
    return async (dispatch) => {
        dispatch(registerAttempt());

        try {
            const res = await api('auth/register', 'POST', { username, email, password, confirm });

            if (res.username) {
                dispatch(registerSuccess());
            } else {
                dispatch(registerFail(res.error));
            }
        } catch (err) {
            dispatch(registerFail('Something went wrong'));
        }
    };
};

export function registerAttempt() {
    return {
        type: AUTH_REGISTER_ATTEMPT,
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFail(errorMsg) {
    return {
        type: AUTH_REGISTER_FAIL,
        errorMsg: errorMsg,
    };
}
