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
	assignedTo?: string;
}

export interface TasksContextType {
	tasks: Task[];
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
	error: Error | null;
}
