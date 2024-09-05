import { useQuery } from '@tanstack/react-query';
import { TASKS_API_URL } from './constants';

export enum TASK_APP_QUERY_KEYS {
	GET_TASKS = 'get-tasks',
}

const fetchTasks = async (url: string) => {
	const response = await fetch(url);
	return await response.json();
};

export const useTasks = () =>
	useQuery({
		queryKey: [TASK_APP_QUERY_KEYS.GET_TASKS],
		queryFn: () => fetchTasks(TASKS_API_URL),
	});
