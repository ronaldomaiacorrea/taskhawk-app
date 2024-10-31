import { useQuery } from '@tanstack/react-query';
import { TASK_APP_QUERY_KEYS } from '@constants';
import type { Task } from '@shared/types';
import { taskApi } from '@api/client';

export const useTasks = () =>
	useQuery<Task[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.TASKS],
		queryFn: () => taskApi.getAll(),
	});

export const useMonthTasks = (month: string) => {
	return useQuery<Task[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.TASKS, month],
		queryFn: () => taskApi.getByMonth(month),
	});
};
