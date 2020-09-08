import { AppActions, TEAM_MY_FETCH } from '../types/actions';
import { TeamMember } from './../types/actions';

const initialState: {
    id: string | null;
    name: string;
    description: string;
    members: TeamMember[];
    roles: any[];
    rolePermissions: any[];
} = {
    id: null,
    name: '',
    description: '',
    members: [],
    roles: [],
    rolePermissions: [],
};

export default (state = initialState, action?: AppActions) => {
    switch (action?.type) {
        case TEAM_MY_FETCH:
            console.log(action.payload);
            return Object.assign({}, state, {
                id: action.payload.id,
                members: action.payload.members,
                roles: action.payload.roles,
                rolePermissions: action.payload.rolePermissions,
            });
    }

    return state;
};
