import { authApi } from '@api/auth.api';
import { TASK_APP_QUERY_KEYS } from '@constants';
import type { IUserProfile } from '@shared/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      email,
      password,
      displayName,
    }: {
      email: string;
      password: string;
      displayName: string;
    }) => authApi.signUp(email, password, displayName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.AUTH],
      });
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.AUTH],
      });
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.AUTH],
      });
    },
  });
};

export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.AUTH],
      });
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPassword: string) => authApi.changePassword(newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.AUTH],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => authApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.AUTH],
      });
    },
  });
};

export const useUserProfile = () =>
  useQuery<IUserProfile, Error>({
    queryKey: [TASK_APP_QUERY_KEYS.AUTH, 'profile'],
    queryFn: () => authApi.getUserProfile(),
  });
