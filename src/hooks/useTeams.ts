import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Team, User, Role } from '../../server/node_modules/@prisma/client';
import useUser from './useUser';

interface UpdateTeamOpts {
  name: string;
  description: string;
}

type TeamType = Team & {
  users: User[];
  roles: Role[];
};
const useTeams = () => {
  const { data: userData } = useUser();
  const { data, error, isLoading, refetch } = useQuery<{ teams: TeamType[] }>(
    ['getTeams'],
    async () => await api('team/', 'GET')
  );

  const teams: TeamType[] = data?.teams || [];
  const [team] = teams;
  const hasTeam = !!team;

  const hasPermission = (permission: string) => {
    if (!userData || !userData.user) return false;
    if (!team) return false;
    if (!team.roles) return false;
    return team.roles.some(
      (role) =>
        role.userIDs.includes(userData.user.id) &&
        role.permissions.includes(permission)
    );
  };

  const updateTeam = async ({ name, description }: UpdateTeamOpts) => {
    await api('team/update', 'PUT', {
      id: data?.teams[0].id,
      name,
      description,
    });
    await refetch();
  };

  return {
    data,
    team,
    error,
    hasTeam,
    isLoading,
    updateTeam,
    refetch,
    hasPermission,
  } as const;
};

export default useTeams;
