import { RootState } from '../store/configure';

export default (state: RootState, permissionToCheck: string) => {
    const teamUser = state.team.members.find((user) => true); //TODO: we don't know the _id yet, so just fetch the first one.
    const roleIndex = teamUser?.roleIndex;
    console.log('i have index', roleIndex, permissionToCheck);
    const rolePerm = state.team.rolePermissions.find(
        (rolePerm) => rolePerm.roleIndex === roleIndex
    );
    console.log('role perms', rolePerm);
    return rolePerm?.permissions.includes(permissionToCheck);
};
