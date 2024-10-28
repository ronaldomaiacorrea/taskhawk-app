import { useContext } from 'react';
import { Button } from 'primereact/button';
import { DarkModeContext } from '@context/DarkModeProvider';
import TaskHawkLogo from '../assets/TaskHawk_Logo_Transparent.png';

const Header = () => {
	const { toggleTheme } = useContext(DarkModeContext);

	return (
		<header className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 to-teal-800/90 px-8 shadow-md shadow-teal-500/50 backdrop-blur-md py-1S">
			<div className="mx-auto h-auto flex flex-row justify-between items-center text-white">
				<div className="flex items-center gap-2">
					<div className="font-bold hidden sm:block">
						<img src={TaskHawkLogo} width={100} alt="Task Hawk logo" />
					</div>
					<div className="text-2xl font-bold text-white">Task Hawk</div>
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
