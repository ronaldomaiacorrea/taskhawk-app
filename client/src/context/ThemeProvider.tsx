import { useDarkMode } from '@hooks/useDarkMode';
import type { UserSettings } from '@shared/types';
import React, { createContext } from 'react';

interface ThemeContext {
  theme: UserSettings['theme'];
  setTheme: React.Dispatch<React.SetStateAction<UserSettings['theme']>>;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  setTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
