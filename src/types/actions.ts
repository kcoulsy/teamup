export const APP_INITIALISING = 'APP_INITIALISING';
export const APP_INITIALISED = 'APP_INITIALISED';
export const AUTH_LOGIN_ATTEMPT = 'AUTH_LOGIN_ATTEMPT';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REGISTER_ATTEMPT = 'AUTH_REGISTER_ATTEMPT';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAIL = 'AUTH_REGISTER_FAIL';
export const TEAM_MY_FETCH = 'TEAM_MY_FETCH';

export interface AppInitialisingAction {
    type: typeof APP_INITIALISING;
}

export interface AppInitialisedAction {
    type: typeof APP_INITIALISED;
}

export type AppActionTypes = AppInitialisingAction | AppInitialisedAction;

export interface AuthLoginAttemptAction {
    type: typeof AUTH_LOGIN_ATTEMPT;
}

export interface AuthLoginSuccessAction {
    type: typeof AUTH_LOGIN_SUCCESS;
    token: string;
}

export interface AuthLoginFailAction {
    type: typeof AUTH_LOGIN_FAIL;
}

export interface AuthLogoutAction {
    type: typeof AUTH_LOGOUT;
}

export interface AuthRegisterAttemptAction {
    type: typeof AUTH_REGISTER_ATTEMPT;
}

export interface AuthRegisterSuccessAction {
    type: typeof AUTH_REGISTER_SUCCESS;
}

export interface AuthRegisterFailAction {
    type: typeof AUTH_REGISTER_FAIL;
    errorMsg: string;
}
// TODO move to types
export interface TeamMember {
    _id: string;
    user: string;
    role: string;
    roleIndex: number;
}

export interface TeamMyFetchAction {
    type: typeof TEAM_MY_FETCH;
    payload: {
        id: string | null;
        name: string | null;
        description: string | null;
        members: TeamMember[];
        roles: string[];
        rolePermissions: any[];
    };
}

export type AuthActionTypes =
    | AuthLoginAttemptAction
    | AuthLoginSuccessAction
    | AuthLoginFailAction
    | AuthLogoutAction
    | AuthRegisterAttemptAction
    | AuthRegisterSuccessAction
    | AuthRegisterFailAction;

export type TeamActions = TeamMyFetchAction;

export type AppActions = AuthActionTypes | AppActionTypes | TeamActions;
