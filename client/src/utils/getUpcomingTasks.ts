import { Status, Task } from './types';

export const getUpcomingTasks = (tasks: Task[] | undefined) => {
	if (!tasks) return [];
	return tasks
		?.filter(
			(task) =>
				task.status !== Status.COMPLETED && task.status !== Status.OVERDUE
		)
		.sort(
			(a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
		);
};
