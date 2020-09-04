import { AppActions, TEAM_MY_FETCH } from '../types/actions';

const initialState = {
    name: '',
    description: '',
    members: [],
    roles: [],
    rolePermmission: [],
};

export default (state = initialState, action?: AppActions) => {
    switch (action?.type) {
        case TEAM_MY_FETCH:
            console.log(action.payload);
            return Object.assign({}, state, {
                members: action.payload.members,
                roles: action.payload.roles,
                rolePermissions: action.payload.rolePermissions,
            });
    }

    return state;
};
