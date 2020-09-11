import { TEAM_MY_FETCH, AppActions } from '../types/actions';
import { TeamMyFetchAction } from './../types/actions';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from './../services/api';
import { RootState } from '../store/configure';

export function storeTeam({
    id = null,
    name = null,
    description = null,
    members = [],
    roles = [],
    rolePermissions = [],
}: {
    id?: string | null;
    name?: string | null;
    description?: string | null;
    members?: any[];
    roles?: string[];
    rolePermissions?: any[];
}): TeamMyFetchAction {
    return {
        type: TEAM_MY_FETCH,
        payload: {
            id,
            name,
            description,
            members,
            roles,
            rolePermissions,
        },
    };
}

export const createTeam = ({
    name,
    description,
}: {
    name: string;
    description: string;
}) => {
    return (dispatch: Dispatch<AppActions>) => {
        return new Promise(async (resolve, reject) => {
            const res = await api('/team/create', 'POST', {
                name,
                description,
            });
            if (res.team) {
                dispatch(
                    storeTeam({
                        id: res.team._id,
                        name: res.team.name,
                        description: res.team.description,
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

export const updateTeam = ({
    name,
    description,
}: {
    name: string;
    description: string;
}) => {
    return async (dispatch: Dispatch<AppActions>) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api('/team/update', 'PUT', {
                    name,
                    description,
                });

                if (res.success) {
                    dispatch(
                        storeTeam({
                            id: res.team._id,
                            name: res.team.name,
                            description: res.team.description,
                            members: res.team.users,
                            roles: res.team.roles,
                            rolePermissions: res.team.rolePermissions,
                        })
                    );
                    resolve(true);
                }
            } catch (error) {
                reject(false);
            }
        });
    };
};

//TODO this needs to be changed leave team not remove
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
                            name: team.name,
                            description: team.description,
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
