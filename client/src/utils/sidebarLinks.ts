type SidebarLink = {
	path: string;
	pageName: string;
	icon: string;
};

export const sidebarLinks: SidebarLink[] = [
	{ path: '/', pageName: 'Dashboard', icon: 'pi pi-home' },
	{ path: '/tasks', pageName: 'Tasks', icon: 'pi pi-list' },
	{ path: '/calendar', pageName: 'Calendar', icon: 'pi pi-calendar' },
	{ path: '/categories', pageName: 'Categories', icon: 'pi pi-tags' },
	{ path: '/settings', pageName: 'Settings', icon: 'pi pi-cog' },
];
