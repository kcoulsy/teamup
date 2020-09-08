import { RootState } from '../store/configure';

export default (state: RootState, permissionToCheck: string) => {
    const teamUser = state.team.members.find((user) => true); //TODO: we don't know the _id yet, so just fetch the first one.
    const role = teamUser?.role;
    const rolePerm = state.team.rolePermissions.find(
        (rolePerm) => rolePerm.role === role
    );
    return rolePerm?.permissions.includes(permissionToCheck);
};
