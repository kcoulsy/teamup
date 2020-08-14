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
    AppActions
} from '../types/actions';
import { api, ApiMethod } from '../services/api';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store/configure';

export const initialise = () => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        if (getState().auth.appInitialising) return;

        dispatch(appInitialising());

        const token = localStorage.getItem('userToken');

        dispatch(loginAttempt());

        if (typeof token === 'string') {
            const response = await api('auth/verify', ApiMethod.GET);

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

export function appInitialised(): AppActions {
    return {
        type: APP_INITIALISED,
    };
}

export function appInitialising(): AppActions {
    return {
        type: APP_INITIALISING,
    };
}

export const startLogin = (username: string, password: string) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(loginAttempt());

        try {
            const { token } = await api('auth/login', ApiMethod.POST, {
                username,
                password,
            });

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

export function loginAttempt(): AppActions {
    return {
        type: AUTH_LOGIN_ATTEMPT,
    };
}

export function loginSuccess(token: string): AppActions {
    localStorage.setItem('userToken', token);
    return {
        type: AUTH_LOGIN_SUCCESS,
        token,
    };
}

export function loginFail(): AppActions {
    localStorage.removeItem('userToken');
    return {
        type: AUTH_LOGIN_FAIL,
    };
}

export const startLogout = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        // TODO: call api here and remove any tokens from the user.
        localStorage.removeItem('userToken');
        dispatch(logout());
    };
};

export function logout(): AppActions {
    return {
        type: AUTH_LOGOUT,
    };
}

interface IRegister {
    username: string;
    email: string;
    password: string;
    confirm: string;
}

export const startRegister = ({ username, email, password, confirm }: IRegister) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(registerAttempt());

        try {
            const res = await api('auth/register', ApiMethod.POST, {
                username,
                email,
                password,
                confirm,
            });

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

export function registerAttempt(): AppActions {
    return {
        type: AUTH_REGISTER_ATTEMPT,
    };
}

export function registerSuccess(): AppActions {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFail(errorMsg: string): AppActions {
    return {
        type: AUTH_REGISTER_FAIL,
        errorMsg: errorMsg,
    };
}
