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
}

export interface TasksContextType {
	tasks: Task[] | undefined;
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
	error: Error | null;
}

export interface Category {
	id: number;
	name: string;
	icon?: string;
	description?: string;
}
