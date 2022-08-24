import { AppActions, TEAM_MY_FETCH } from '../types/actions';
// import { Team } from '../types/team';

const initialState: any = {
  _id: null,
  name: '',
  description: '',
  users: [],
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
        users: action.payload.users,
        roles: action.payload.roles,
      });
  }

  return state;
};
