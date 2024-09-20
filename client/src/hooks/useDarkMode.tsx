import { useEffect, useState } from 'react';

export const useDarkMode = (): [string, () => void] => {
	const [theme, setTheme] = useState(
		localStorage.getItem('theme') ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light')
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

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return [theme, toggleTheme];
};
