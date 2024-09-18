import { useQuery } from '@tanstack/react-query';
import { TASK_APP_QUERY_KEYS, TASKS_API_URL } from './constants';
import { Task } from '../utils/types';

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
