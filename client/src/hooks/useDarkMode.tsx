import type { UserSettings } from '@shared/types';
import { useEffect, useState } from 'react';

export const useDarkMode = (): [
  UserSettings['theme'],
  React.Dispatch<React.SetStateAction<UserSettings['theme']>>,
] => {
  const [theme, setTheme] = useState<UserSettings['theme']>(
    (localStorage.getItem('theme') as UserSettings['theme']) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'),
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return [theme, setTheme];
};
