import { AUTH_API_URL } from '@constants';
import type { IAuthUser } from '@shared/types';
import { handleResponse } from './general.api';

export const authApi = {
  signUp: async (email: string, password: string, displayName: string) => {
    const response = await fetch(`${AUTH_API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName }),
    });
    return handleResponse<IAuthUser>(response);
  },

  signIn: async (email: string, password: string) => {
    const response = await fetch(`${AUTH_API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<IAuthUser>(response);
  },

  signOut: async () => {
    const response = await fetch(`${AUTH_API_URL}/signout`, {
      method: 'POST',
    });
    return handleResponse<IAuthUser>(response);
  },

  forgotPassword: async (email: string) => {
    const response = await fetch(`${AUTH_API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleResponse<IAuthUser>(response);
  },

  changePassword: async (newPassword: string) => {
    const response = await fetch(`${AUTH_API_URL}/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword }),
    });
    return handleResponse<IAuthUser>(response);
  },

  deleteUser: async (id: string) => {
    const response = await fetch(`${AUTH_API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<IAuthUser>(response);
  },

  getUserProfile: async () => {
    const response = await fetch(`${AUTH_API_URL}/profile`);
    return handleResponse<IAuthUser>(response);
  },
};
