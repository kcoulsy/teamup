import { RootState } from '../store/configure';

export default (state: RootState) => {
    return state.team._id !== null;
};
