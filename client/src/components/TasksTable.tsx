// import { useTasks } from '../queries/tasks';
// import ErrorMessage from './ErrorMessage';
// import type { Task } from '../utils/types';

// const TasksTable = () => {
// 	const { data: tasks, isLoading, error, isError } = useTasks();

// 	// const columnDefinitions: GridColDef[] = [
// 	// 	{ field: 'title', headerName: 'Title', width: 130 },
// 	// 	{ field: 'description', headerName: 'Description', width: 130 },
// 	// 	{ field: 'creationDate', headerName: 'Creation date', width: 200 },
// 	// 	{ field: 'dueDate', headerName: 'Due date', width: 200 },
// 	// 	{ field: 'priority', headerName: 'Priority', width: 130 },
// 	// 	{ field: 'status', headerName: 'Status', width: 130 },
// 	// 	{ field: 'assignedTo', headerName: 'Assigned to', width: 130 },
// 	// ];

// 	// const defineRows = (rows: Task[]) =>
// 	// 	rows?.map((row) => ({
// 	// 		id: row.id,
// 	// 		title: row.title,
// 	// 		description: row.description,
// 	// 		creationDate: row.creationDate,
// 	// 		dueDate: row.dueDate,
// 	// 		priority: row.priority,
// 	// 		status: row.status,
// 	// 		assignedTo: row.assignedTo,
// 	// 	}));

// 	return <>{isError && <ErrorMessage error={error} />}</>;
// };

// export default TasksTable;
