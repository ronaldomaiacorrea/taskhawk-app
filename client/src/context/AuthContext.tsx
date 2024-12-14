import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { TASK_APP_QUERY_KEYS } from "../lib/constants/queryKeys";
import { useSignIn } from "../lib/queries/auth";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();
  const signInMutation = useSignIn();

  useEffect(() => {
    const userData = queryClient.getQueryData([TASK_APP_QUERY_KEYS.AUTH]);
    if (userData) {
      setIsAuthenticated(true);
    }
  }, [queryClient]);

  const login = async (email: string, password: string) => {
    const response = await signInMutation.mutateAsync({ email, password });
    if (response) {
      setIsAuthenticated(true);
      queryClient.setQueryData([TASK_APP_QUERY_KEYS.AUTH], response.data);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    queryClient.removeQueries({ queryKey: [TASK_APP_QUERY_KEYS.AUTH]});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
