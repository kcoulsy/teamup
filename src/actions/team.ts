import { TEAM_MY_FETCH, AppActions } from '../types/actions';
import { TeamMyFetchAction } from './../types/actions';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from './../services/api';
import { RootState } from '../store/configure';

export function storeTeam({
    id = null,
    members = [],
    roles = [],
    rolePermissions = [],
}: {
    id?: string | null;
    members?: any[];
    roles?: string[];
    rolePermissions?: any[];
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

export const updateTeamRoles = (roles: string[]) => {
    return async (
        dispatch: Dispatch<AppActions>,
        getState: () => RootState
    ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api('/team/roles', 'POST', { roles });
                const { team } = getState();

                if (res.success) {
                    dispatch(
                        storeTeam({
                            id: team.id,
                            members: team.members,
                            rolePermissions: team.rolePermissions,
                            roles,
                        })
                    );
                    resolve(true);
                } else {
                    reject(false);
                }
            } catch (error) {
                reject(false);
            }
        });
    };
};
