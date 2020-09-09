import { TEAM_MY_FETCH, AppActions } from '../types/actions';
import { TeamMyFetchAction } from './../types/actions';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from './../services/api';

export function storeTeam({
    id = null,
    members = [],
    roles = [],
    rolePermissions = [],
}): TeamMyFetchAction {
    return {
        type: TEAM_MY_FETCH,
        payload: {
            id,
            members,
            roles,
            rolePermissions,
        },
    };
}

export const createTeam = () => {
    return (dispatch: Dispatch<AppActions>) => {
        return new Promise(async (resolve, reject) => {
            const res = await api('/team/create', 'POST');
            if (res.team) {
                dispatch(
                    storeTeam({
                        id: res.team._id,
                        members: res.team.users,
                        roles: res.team.roles,
                        rolePermissions: res.team.rolePermissions,
                    })
                );
                resolve(true);
            }
        });
    };
};

export const removeTeam = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api('/team/leave', 'POST');
                if (!res.user.team) {
                    dispatch(storeTeam({}));
                    resolve(true);
                }
            } catch (error) {
                reject(false);
            }
        });
    };
};
