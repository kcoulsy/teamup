import { AppActions, TEAM_MY_FETCH } from '../types/actions';
import { Team } from '../types/team';

const initialState: Team = {
    _id: null,
    name: '',
    description: '',
    members: [],
    roles: [],
    rolePermissions: [],
};

export default (state = initialState, action?: AppActions) => {
    switch (action?.type) {
        case TEAM_MY_FETCH:
            return Object.assign({}, state, {
                _id: action.payload._id,
                name: action.payload.name,
                description: action.payload.description,
                members: action.payload.members,
                roles: action.payload.roles,
                rolePermissions: action.payload.rolePermissions,
            });
    }

    return state;
};
