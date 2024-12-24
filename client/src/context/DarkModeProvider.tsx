import { useDarkMode } from '@hooks/useDarkMode';
import type { UserSettings } from '@shared/types';
import React, { createContext } from 'react';

interface DarkModeContextType {
  darkMode: UserSettings['darkMode'];
  toggleTheme: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleTheme: () => {},
});

type DarkModeProviderProps = {
  children: React.ReactNode;
};

const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, toggleTheme] = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
