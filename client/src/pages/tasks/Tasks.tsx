import PageTitle from '@components/PageTitle';
import { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Status, Task } from '@shared/types';
import TasksTable from './TasksTable';
import { useCategories } from '@queries/categories';
import Calendar from '../calendar/Calendar';
import CardTitle from '@components/CardTitle';

const tasks: Task[] = [
	{
		id: 1,
		title: 'Design Homepage',
		description: 'Create a responsive design for the homepage.',
		creationDate: new Date('2024-09-01'),
		dueDate: new Date('2024-10-10'),
		priority: 'High',
		status: Status.IN_PROGRESS,
		categoryId: 1,
	},
	{
		id: 2,
		title: 'Fix Login Bug',
		description: 'Resolve the login timeout issue.',
		creationDate: new Date('2024-09-05'),
		dueDate: new Date('2024-09-15'),
		priority: 'High',
		status: Status.COMPLETED,
		categoryId: 2,
	},
	{
		id: 3,
		title: 'Update User Documentation',
		creationDate: new Date('2024-09-12'),
		dueDate: new Date('2024-10-01'),
		priority: 'Medium',
		status: Status.IN_PROGRESS,
		categoryId: 3,
	},
	{
		id: 4,
		title: 'Refactor API Service',
		description: 'Improve code structure for the API service.',
		creationDate: new Date('2024-09-18'),
		dueDate: new Date('2024-10-08'),
		priority: 'Low',
		status: Status.TO_DO,
		categoryId: 1,
	},
	{
		id: 5,
		title: 'Setup DevOps Pipeline',
		description: 'Integrate CI/CD pipeline for project builds.',
		creationDate: new Date('2024-08-25'),
		dueDate: new Date('2024-09-30'),
		priority: 'High',
		status: Status.IN_PROGRESS,
		categoryId: 4,
	},
	{
		id: 6,
		title: 'Update Privacy Policy',
		creationDate: new Date('2024-09-02'),
		dueDate: new Date('2024-09-20'),
		priority: 'Medium',
		status: Status.COMPLETED,
		categoryId: 3,
	},
	{
		id: 7,
		title: 'Add Dark Mode Support',
		description: 'Implement dark mode toggle for the frontend.',
		creationDate: new Date('2024-09-14'),
		dueDate: new Date('2024-10-01'),
		priority: 'Low',
		status: Status.BLOCKED,
		categoryId: 1,
	},
	{
		id: 8,
		title: 'Conduct Usability Testing',
		creationDate: new Date('2024-09-21'),
		dueDate: new Date('2024-10-05'),
		priority: 'Medium',
		status: Status.BLOCKED,
		categoryId: 5,
	},
	{
		id: 9,
		title: 'Implement OAuth2 Login',
		creationDate: new Date('2024-09-15'),
		dueDate: new Date('2024-10-10'),
		priority: 'High',
		status: Status.IN_PROGRESS,
		categoryId: 2,
	},
	{
		id: 10,
		title: 'Deploy to Production',
		description: 'Deploy the latest build to production environment.',
		creationDate: new Date('2024-09-20'),
		dueDate: new Date('2024-09-30'),
		priority: 'High',
		status: Status.OVERDUE,
		categoryId: 4,
	},
];

const Tasks = () => {
	// const { tasks = [{ description: 'test', title: 'test', id: 1 }] } =
	// 	useContext(TasksContext);
	const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
	const { data: categories = [] } = useCategories();

	return (
		<>
			<PageTitle>Tasks management</PageTitle>
			<div className="lg:space-y-0 space-y-6">
				<div className="flex flex-col justify-between lg:items-center lg:flex-row lg:space-y-0">
					<div>
						<Button
							icon="pi pi-plus"
							label="Task"
							outlined
							className="my-4 text-teal-500 border-teal-500 dark:text-teal-400 dark:border-teal-400"
							onClick={() => setIsCreateDialogVisible(true)}
						/>
					</div>
					<div>
						<div className="relative w-full max-w-xs">
							<InputText
								placeholder="Keyword Search"
								className="pl-10 w-full"
							/>
							<i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1">
					<TasksTable tasks={tasks} categories={categories} />
				</div>
			</div>
		</>
	);
};

export default Tasks;
