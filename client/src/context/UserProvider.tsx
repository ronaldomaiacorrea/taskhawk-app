import { Spinner } from '@common';
import type { IUserProfile } from '@shared/types';
import React, { createContext } from 'react';
import { useUserProfile } from 'src/lib/queries/auth';

interface UserContext {
  user: IUserProfile['data']['identities'][0] | null;
}

export const UserContext = createContext<UserContext>({ user: null });

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const { data: userProfile, isLoading } = useUserProfile();

  if (isLoading) {
    <Spinner />;
  }

  const user = userProfile ? userProfile.data.identities[0] : null;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
