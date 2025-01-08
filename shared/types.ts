export enum Status {
	TO_DO = 'To do',
	COMPLETED = 'Completed',
	BLOCKED = 'Blocked',
	OVERDUE = 'Overdue',
	IN_PROGRESS = 'In progress',
}

export interface Task {
	id: string;
	user_id?: string;
	title: string;
	description?: string;
	creationDate: Date;
	dueDate: Date;
	priority: 'High' | 'Medium' | 'Low' | '';
	status?: Status;
	category_id?: number;	
}

export type Language = 'en-US' | 'es' | 'fr' | 'pt-BR' | 'zh';

export interface UserSettings {
	theme: 'light' | 'dark';
	username: string;
	email: string;	
	language: Language
}

export interface IUser {
	id: string;
	email: string;
	displayName: string;
	access_token: string;
	refresh_token: string;
}

export interface IAuthUser {
	message: string;
	data: {
		session: {
			access_token: string;
			refresh_token: string;
			user: {
				id: string;
				email: string;
				user_metadata: {
					displayName: string;
				};
			}
		}
	}
}

export interface IUserProfile {
	data: {
	  identities: {
		identity_id: string;
		id: string;
		user_id: string;
		identity_data: {
		  email: string;
		  email_verified: boolean;
		  phone_verified: boolean;
		  sub: string;
		};
		provider: string;		
		last_sign_in_at: string;
		created_at: string;
		updated_at: string;
		email: string;
	  }[];
	};
  }

export interface Category {
	id: number;
	name: string;
	icon: ICON;
	description?: string;
	user_id?: string;
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
