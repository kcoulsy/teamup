import {
    AUTH_LOGIN_ATTEMPT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT,
    AUTH_REGISTER_ATTEMPT,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAIL,
    AppActions,
} from '../types/actions';
import { api } from './../services/api';
import { Dispatch } from '@reduxjs/toolkit';
import { userFetch } from './user';
import { storeTeam } from './team';

export const startLogin = (username: string, password: string) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(loginAttempt());

        try {
            const { user, token } = await api('auth/login', 'POST', {
                username,
                password,
            });

            if (token) {
                dispatch(userFetch(user));
                dispatch(loginSuccess(token));
                dispatch(storeTeam(user.team));
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
        dispatch(userFetch({ _id: '', username: '', email: '', team: '' }));
        dispatch(storeTeam({}));
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

export const startRegister = ({
    username,
    email,
    password,
    confirm,
}: IRegister) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(registerAttempt());

        try {
            const { success, token, user, error } = await api(
                'auth/register',
                'POST',
                {
                    username,
                    email,
                    password,
                    confirm,
                }
            );

            if (success) {
                dispatch(registerSuccess());
                dispatch(userFetch(user));
                dispatch(loginSuccess(token));
            } else {
                dispatch(registerFail(error));
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
