import { Status, Task } from '../../../shared/types';

export const getUpcomingTasks = (tasks: Task[]) =>
	tasks
		?.filter(
			(task) =>
				task.status !== Status.COMPLETED && task.status !== Status.OVERDUE
		)
		.sort(
			(a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
		);
