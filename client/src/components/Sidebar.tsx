import FormattedLink from './FormattedLink';

type SidebarLink = {
	path: string;
	pageName: string;
	icon: string;
};

const sidebarLinks: SidebarLink[] = [
	{ path: '/', pageName: 'Dashboard', icon: 'pi pi-home' },
	{ path: '/tasks', pageName: 'Tasks', icon: 'pi pi-list' },
	{ path: '/categories', pageName: 'Categories', icon: 'pi pi-tags' },
	{ path: '/settings', pageName: 'Settings', icon: 'pi pi-cog' },
];

const Sidebar = () => {
	return (
		<nav className="w-64 bg-gray-800 text-white sm:flex flex-col sm:w-16 md:w-56 p-4 shrink-0 hidden">
			<ul className="space-y-4">
				{sidebarLinks.map(({ path, pageName, icon }) => (
					<FormattedLink
						key={path}
						path={path}
						pageName={pageName}
						icon={icon}
					/>
				))}
			</ul>
		</nav>
	);
};

export default Sidebar;
