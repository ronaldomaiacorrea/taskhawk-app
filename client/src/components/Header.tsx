import { useContext } from 'react';
import { Button } from 'primereact/button';
import { DarkModeContext } from '../context/DarkModeProvider';

const Header = () => {
	const { toggleTheme } = useContext(DarkModeContext);

	return (
		<header className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 to-teal-800/90 px-8 shadow-md shadow-teal-500/50 backdrop-blur-md">
			<div className="mx-auto h-16 flex flex-row justify-between items-center text-white">
				<div className="flex gap-2">
					<div className="font-bold hidden sm:block">Logo</div>
					<div className="text-lg font-bold text-white">TaskHawk</div>
				</div>
				<div className="flex gap-2">
					<Button
						icon="pi pi-sun"
						outlined
						onClick={toggleTheme}
						className="bg-teal-900 border-teal-900 dark:bg-teal-900 dark:border-teal-900 text-teal-500 dark:text-teal-400"
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
