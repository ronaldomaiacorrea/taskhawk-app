import { createContext } from 'react';
import { useTasks } from '../queries/tasks';

export const TasksContext = createContext({});

type TasksProviderProps = {
	children: React.ReactNode;
};

const TasksProvider = ({ children }: TasksProviderProps) => {
	const { data: tasks, error, isLoading, isFetching, isError } = useTasks();

	return (
		<TasksContext.Provider
			value={{ tasks, error, isLoading, isFetching, isError }}
		>
			{children}
		</TasksContext.Provider>
	);
};

export default TasksProvider;
