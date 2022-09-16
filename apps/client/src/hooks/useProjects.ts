import { useMutation, useQuery } from '@tanstack/react-query';
import { Project } from '@prisma/client';
import { api } from '../services/api';

const useProjects = (teamId?: string) => {
  const path = `project/${teamId ? `?teamId=${teamId}` : ''}`;
  const getKey = teamId ? `getProjects-${teamId}` : 'getProjects';
  const mutateKey = teamId ? `createProject-${teamId}` : 'createProject';
  const query = useQuery<{ projects: Project[] }>(
    [getKey],
    async () => api(path, 'GET'),
  );

  const createMutation = useMutation(
    [mutateKey],
    async (project: { title: string; description: string; teamId?: string }) => api('project/', 'POST', project),
    {
      onSuccess: () => query.refetch(),
    },
  );

  return { ...query, createMutation };
};

export default useProjects;
