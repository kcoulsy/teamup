import { AppActions } from '../types/actions';
import { User } from './../types/user';
import { USER_FETCH } from './../types/actions';

const initialState: User = {
    _id: '',
    email: '',
    username: '',
    teamInvites: [],
};

export default (state = initialState, action: AppActions) => {
    switch (action.type) {
        case USER_FETCH:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
