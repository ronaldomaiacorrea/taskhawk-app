import React, { createContext } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

interface DarkModeContextType {
	theme: string;
	toggleTheme: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
	theme: 'light',
	toggleTheme: () => {},
});

type DarkModeProviderProps = {
	children: React.ReactNode;
};

const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
	const [theme, toggleTheme] = useDarkMode();

	return (
		<DarkModeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export default DarkModeProvider;
