export interface Task {
	id: number;
	title: string;
	description: string;
	creationDate: Date;
	dueDate: Date;
	priority: 'High' | 'Medium' | 'Low';
	status:
		| 'To do'
		| 'Completed'
		| 'Blocked'
		| 'Overdue'
		| 'In progress'
		| 'On hold'
		| 'Canceled';
	assignedTo: string;
}
