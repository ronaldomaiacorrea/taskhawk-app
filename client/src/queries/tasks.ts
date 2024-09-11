import { useQuery } from '@tanstack/react-query';
import { TASKS_API_URL } from './constants';
import { Task } from '../utils/types';

export enum TASK_APP_QUERY_KEYS {
	GET_TASKS = 'get-tasks',
}

const fetchTasks = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response failed');
	}

	return await response.json();
};

export const useTasks = () =>
	useQuery<Task[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.GET_TASKS],
		queryFn: () => fetchTasks(TASKS_API_URL),
	});
