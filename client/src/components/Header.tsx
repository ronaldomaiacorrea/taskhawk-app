import React from 'react';

const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 to-teal-500 px-8">
			<div className="mx-auto h-16 flex justify-between items-center text-white">
				<div className="flex gap-1">
					<div className="font-bold hidden sm:block">Logo</div>
					<div className="text-lg font-bold text-white">Task Hawk</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
