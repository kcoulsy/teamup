import { AppActions, APP_INITIALISED } from '../types/actions';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store/configure';
import { loginAttempt, loginSuccess, loginFail } from './auth';
import { APP_INITIALISING } from './../types/actions';
import { api } from './../services/api';
import { storeTeam } from './team';
import { userFetch } from './user';

export const initialise = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
    if (getState().auth.appInitialising) return;

    dispatch(appInitialising());

    const token = localStorage.getItem('userToken');

    dispatch(loginAttempt());

    if (typeof token === 'string') {
      const response = await api('auth/verify', 'GET');

      if (response.valid) {
        dispatch(loginSuccess(token));
        if (response.user) {
          dispatch(userFetch(response.user));
        }
        const { teams } = await api('team/', 'GET');
        const [team] = teams;
        if (team && Object.keys(team).length) {
          dispatch(
            storeTeam({
              _id: team.id,
              name: team.name,
              description: team.description,
              users: team.users,
              roles: team.roles,
            })
          );
        } else {
          dispatch(appInitialised());
        }
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
