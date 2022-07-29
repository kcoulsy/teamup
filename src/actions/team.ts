import { TEAM_MY_FETCH, AppActions } from '../types/actions';
import { TeamMyFetchAction } from './../types/actions';
import { Dispatch } from '@reduxjs/toolkit';
import { api } from './../services/api';
import { RootState } from '../store/configure';
import { userFetch } from './user';

export function storeTeam({
  _id = null,
  name = null,
  description = null,
  users = [],
  roles = [],
  rolePermissions = [],
}: {
  _id?: string | null;
  name?: string | null;
  description?: string | null;
  users?: any[];
  roles?: string[];
  rolePermissions?: any[];
}): TeamMyFetchAction {
  return {
    type: TEAM_MY_FETCH,
    payload: {
      _id,
      name,
      description,
      users,
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
        dispatch(storeTeam(res.team));
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
          dispatch(storeTeam(res.team));
          resolve(true);
        }
      } catch (error) {
        reject(false);
      }
    });
  };
};

export const leaveTeam = () => {
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
  return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api('/team/roles', 'POST', { roles });
        const { team } = getState();

        if (res.success) {
          dispatch(
            storeTeam({
              ...team,
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

export const updateTeamMemberRole = (userId: string, roleIndex: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api('/team/user/update', 'POST', {
          userId,
          roleIndex,
        });

        if (res.success) {
          dispatch(storeTeam(res.team));
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

export const updateTeamPermissions = (
  roleIndex: number,
  permissions: string[]
) => {
  return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api('/team/permissions', 'POST', {
          roleIndex,
          permissions,
        });

        if (res.success) {
          dispatch(storeTeam(res.team));
          resolve(true);
        } else {
          reject(false);
        }
      } catch (err) {
        reject(false);
      }
    });
  };
};

export const acceptTeamInvite = (_id: string | null) => {
  return (dispatch: Dispatch<AppActions>): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { success, team, user } = await api('/team/accept', 'POST', {
          teamId: _id,
        });
        if (success) {
          dispatch(userFetch(user));
          dispatch(storeTeam(team));
          resolve(true);
        } else {
          reject(false);
        }
      } catch (err) {
        reject(false);
      }
    });
  };
};

export const declineTeamInvite = (_id: string | null) => {
  return (dispatch: Dispatch<AppActions>): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { success, user } = await api('/team/decline', 'POST', {
          teamId: _id,
        });
        if (success) {
          dispatch(userFetch(user));
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        resolve(false);
      }
    });
  };
};

export const removeTeamUser = (userId: string) => {
  return (dispatch: Dispatch<AppActions>): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { success, team } = await api('/team/user/remove', 'POST', {
          userId,
        });
        if (success) {
          dispatch(storeTeam(team));
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        resolve(false);
      }
    });
  };
};
