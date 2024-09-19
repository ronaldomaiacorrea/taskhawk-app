export enum Status {
	TO_DO = 'To do',
	COMPLETED = 'Completed',
	BLOCKED = 'Blocked',
	OVERDUE = 'Overdue',
	IN_PROGRESS = 'In progress',
}

export interface Task {
	id: number;
	title: string;
	description?: string;
	creationDate: Date;
	dueDate: Date;
	priority: 'High' | 'Medium' | 'Low';
	status: Status;
	categoryId: number;
}

export interface TasksContextType {
	tasks?: Task[];
	isLoading?: boolean;
	isFetching?: boolean;
	isError?: boolean;
	error?: Error | null;
}

export type TaskWithCategory = Task & {
	categoryName?: string;
};

export interface Category {
	id: number;
	name: string;
	icon: ICON;
	description?: string;
}

export enum ICON {
	Calendar = 'pi pi-calendar',
	Clipboard = 'pi pi-clipboard',
	Tags = 'pi pi-tags',
	Clock = 'pi pi-clock',
	Check = 'pi pi-check',
	Star = 'pi pi-star',
	User = 'pi pi-user',
	Home = 'pi pi-home',
	Cog = 'pi pi-cog',
	Bell = 'pi pi-bell',
	Envelope = 'pi pi-envelope',
	Briefcase = 'pi pi-briefcase',
	Book = 'pi pi-book',
	ChartLine = 'pi pi-chart-line',
	Flag = 'pi pi-flag',
	Folder = 'pi pi-folder',
	Lightbulb = 'pi pi-lightbulb',
	Rocket = 'pi pi-rocket',
	Map = 'pi pi-map',
	Phone = 'pi pi-phone',
	Wrench = 'pi pi-wrench',
	ExclamationTriangle = 'pi pi-exclamation-triangle',
	ShoppingCart = 'pi pi-shopping-cart',
	Heart = 'pi pi-heart',
	Money = 'pi pi-money-bill',
	Education = 'pi pi-graduation-cap',
	Travel = 'pi pi-globe',
	Social = 'pi pi-users',
	Bitcoin = 'pi pi-bitcoin',
	Cloud = 'pi pi-cloud',
	Car = 'pi pi-car',
	Plane = 'pi pi-plane',
	AddressBook = 'pi pi-address-book',
	Camera = 'pi pi-camera',
	Music = 'pi pi-headphones',
	Desktop = 'pi pi-desktop',
	Gift = 'pi pi-gift',
	LinkedIn = 'pi pi-linkedin',
	GitHub = 'pi pi-github',
	Instagram = 'pi pi-instagram',
	Google = 'pi pi-google',
	Facebook = 'pi pi-facebook',
	Whatsapp = 'pi pi-whatsapp',
	QuestionCircle = 'pi pi-question-circle',
}
