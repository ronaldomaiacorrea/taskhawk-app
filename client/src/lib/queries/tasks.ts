import { taskApi } from '@api/client.api';
import { TASK_APP_QUERY_KEYS } from '@constants';
import type { Task } from '@shared/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTasks = () =>
  useQuery<Task[], Error>({
    queryKey: [TASK_APP_QUERY_KEYS.TASKS],
    queryFn: () => taskApi.getAll(),
  });

export const useMonthTasks = (month: string) =>
  useQuery<Task[], Error>({
    queryKey: [TASK_APP_QUERY_KEYS.TASKS, month],
    queryFn: () => taskApi.getByMonth(month),
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Omit<Task, 'id'>>({
    mutationFn: (task: Omit<Task, 'id'>) => taskApi.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.TASKS],
      });
    },
  });
};

export const useDeleteTasks = () => {
  const queryClient = useQueryClient();

  return useMutation<Task[], Error, Task[]>({
    mutationFn: (tasks: Task[]) => taskApi.delete(tasks),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_APP_QUERY_KEYS.TASKS],
      });
    },
  });
};
