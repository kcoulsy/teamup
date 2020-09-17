import { User } from './../types/user';
import { AppActions } from '../types/actions';
import { USER_FETCH } from './../types/actions';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from './../services/api';

export const fetchUser = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        try {
            const { user } = await api('/user/', 'GET');

            if (user) {
                dispatch(userFetch(user));
            }
        } catch (err) {
            dispatch(userFetch({ _id: '', username: '', email: '' }));
        }
    };
};

export function userFetch(user: User): AppActions {
    return {
        type: USER_FETCH,
        payload: user,
    };
}
