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
            return state;
    }

    return state;
};
