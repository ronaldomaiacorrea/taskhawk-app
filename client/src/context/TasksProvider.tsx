import { createContext } from 'react';
import { useTasks } from '@queries/tasks';
import type { TasksContextType } from '@shared/types';

export const TasksContext = createContext<TasksContextType>({
	tasks: [],
	error: null,
	isLoading: false,
	isFetching: false,
	isError: false,
});

type TasksProviderProps = {
	children: React.ReactNode;
};

const TasksProvider = ({ children }: TasksProviderProps) => {
	const {
		data: tasks = [],
		error,
		isLoading,
		isFetching,
		isError,
	} = useTasks();

	return (
		<TasksContext.Provider
			value={{ tasks, error, isLoading, isFetching, isError }}
		>
			{children}
		</TasksContext.Provider>
	);
};

export default TasksProvider;
