import { TEAM_MY_FETCH } from '../types/actions';
import { TeamMyFetchAction } from './../types/actions';

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
