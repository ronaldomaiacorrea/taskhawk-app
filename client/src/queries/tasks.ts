import { useQuery } from '@tanstack/react-query';
import { TASK_APP_QUERY_KEYS, TASKS_API_URL } from './constants';
import type { Task } from '@shared/types';

const fetchTasks = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response failed');
	}

	return await response.json();
};

export const useTasks = () =>
	useQuery<Task[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.TASKS],
		queryFn: () => fetchTasks(TASKS_API_URL),
	});

export const useMonthTasks = (month: string) => {
	return useQuery<Task[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.TASKS, month],
		queryFn: () => fetchTasks(`${TASKS_API_URL}?month=${month}`),
	});
};
