import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Team, User, Role } from './../../../server/node_modules/@prisma/client';
import useUser from './useUser';

interface UpdateTeamOpts {
  name: string;
  description: string;
}

export type TeamType = Team & {
  users: User[];
  invitedUsers: User[];
  roles: Role[];
};

interface UseTeamsOptions {
  onSuccess?: (teams: TeamType[]) => void;
}

const useTeams = ({ onSuccess }: UseTeamsOptions = {}) => {
  const { data: userData } = useUser();
  const { data, error, isLoading, refetch } = useQuery<{ teams: TeamType[] }>(
    ['getTeams'],
    async () => api('team/', 'GET'),
    {
      retry: false,
      onSuccess: (newData) => {
        if (onSuccess) {
          onSuccess(newData.teams);
        }
      },
    },
  );

  const teams: TeamType[] = data?.teams || [];
  const [team] = teams;
  const hasTeam = !!team;

  const createTeamMutation = useMutation(
    (newData: { name: string; description: string }) => api('team/create', 'POST', newData),
    {
      onSuccess: async () => {
        await refetch();
      },
    },
  );

  const updateRolesMutation = useMutation(
    ['updateTeamRoles'],
    async (roles: Role[]) => {
      await api('team/roles', 'PUT', {
        teamId: team.id,
        roles,
      });
    },
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const hasPermission = (permission: string) => {
    if (!userData || !userData.user) return false;
    if (!team) return false;
    if (!team.roles) return false;
    return team.roles.some(
      (role) => role.userIDs.includes(userData.user.id) && role.permissions.includes(permission),
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
    createTeamMutation,
    updateRolesMutation,
  } as const;
};

export default useTeams;
