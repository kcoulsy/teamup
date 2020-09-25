import { RootState } from '../store/configure';
import hasTeam from './hasTeam';

export default (state: RootState, permissionToCheck: string): boolean => {
    if (!hasTeam(state)) return false;

    const teamUser = state.team.users.find(
        ({ user }) => user._id === state.user._id
    );
    const roleIndex = teamUser?.roleIndex;

    if (!roleIndex) return false;

    const rolePerm = state.team.rolePermissions.find(
        (rolePerm) => rolePerm.roleIndex === roleIndex
    );

    return rolePerm?.permissions.includes(permissionToCheck) || false;
};
