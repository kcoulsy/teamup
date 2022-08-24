import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from '../../server/node_modules/@prisma/client';
import { api } from '../services/api';

const useUser = () => {
  const query = useQuery<{ user: User }>(
    ['getUser'],
    async () => await api('user/', 'GET')
  );

  const loginMutation = useMutation(
    ['loginUser'],
    async ({ username, password }: { username: string; password: string }) => {
      return await api('auth/login', 'POST', { username, password });
    },
    {
      onSuccess: (data) => {
        // TODO this should be a server side httponly cookie
        if (data.token) {
          localStorage.setItem('userToken', data.token);
        }
        query.refetch();
      },
    }
  );

  const registerMutation = useMutation(
    ['registerUser'],
    // TDDO type these mutations
    async ({
      username,
      password,
      email,
    }: {
      username: string;
      password: string;
      email: string;
    }) => {
      return await api('auth/register', 'POST', { username, password, email });
    },
    {
      onSuccess: (data) => {
        // TODO this should be a server side httponly cookie
        if (data.token) {
          localStorage.setItem('userToken', data.token);
        }
        query.refetch();
      },
    }
  );

  const logout = () => {
    localStorage.removeItem('userToken');
    query.refetch();
  };

  return {
    ...query,
    logout,
    isLoggedIn: query.data?.user !== null,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isLoading || query.isLoading,
    isLoggingIn: loginMutation.isLoading || query.isLoading,
  };
};

export default useUser;
