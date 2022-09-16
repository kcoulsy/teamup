import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from './../../../server/node_modules/@prisma/client';
import { api } from '../services/api';

const useUser = () => {
  const query = useQuery<{ user: User }>(
    ['getUser'],
    async () => api('user/', 'GET'),
    {
      onError: () => {
        // console.log(err);
        // TODO handle error
      },
      retry: false,
    },
  );

  const loginMutation = useMutation(
    ['loginUser'],
    async ({ username, password }: { username: string; password: string }) =>
      api('auth/login', 'POST', { username, password }),
    {
      onSuccess: () => {
        query.refetch();
      },
    },
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
    }) => api('auth/register', 'POST', { username, password, email }),
    {
      onSuccess: (data) => {
        // TODO this should be a server side httponly cookie
        if (data.token) {
          localStorage.setItem('userToken', data.token);
        }
        query.refetch();
      },
    },
  );

  const logout = async () => {
    await api('auth/logout', 'POST');
    query.refetch();
  };

  return {
    ...query,
    logout,
    isLoggedIn: !!query.data?.user,
    login: loginMutation.mutate,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    registerError: registerMutation.error,
    isRegistering: registerMutation.isLoading || query.isLoading,
    isLoggingIn: loginMutation.isLoading || query.isLoading,
  };
};

export default useUser;
