import { Card } from 'primereact/card';
import type { Category, Task } from '@shared/types';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions';
import { useContext, useMemo } from 'react';
import { TasksContext } from '@context/TasksProvider';
import EmptyData from '@components/EmptyData';

export interface CategoryCardProps {
	category: Category;
	onDelete: (category: Category) => void;
	onEdit: (category: Category) => void;
}

const CategoryCard = ({ category, onDelete, onEdit }: CategoryCardProps) => {
	const { id, name, description, icon } = category;
	const { tasks = [] } = useContext(TasksContext);

	const filteredTasks = useMemo(
		() => tasks.filter((task: Task) => task.categoryId === id),
		[tasks, id]
	);

	const hasTasks = filteredTasks.length > 0;

	const tooltipOptions: TooltipOptions = useMemo(
		() => ({
			position: 'top',
			event: 'hover',
			showOnDisabled: true,
		}),
		[]
	);

	const header = (
		<div className="flex flex-col items-center gap-4">
			<i className={icon} style={{ fontSize: '2rem' }}></i>
			<h3 className="text-xl">{name}</h3>
		</div>
	);

	const subTitle = <p className="text-xl text-center">{description}</p>;

	const content = (
		<>
			<p className="pb-1 font-bold">Current tasks:</p>
			<ScrollPanel
				style={{ width: '100%', height: '100px' }}
				className="border-2 border-gray-200 rounded-lg py-1 dark:border-teal-900"
			>
				<ul className="px-2 py-1">
					{hasTasks ? (
						filteredTasks.map((task: Task) => (
							<li key={task.id}>{task.title}</li>
						))
					) : (
						<EmptyData message="No tasks associated with this category." />
					)}
				</ul>
			</ScrollPanel>
		</>
	);	

	const footer = (
		<div className="flex flex-row items-center justify-end gap-2">			
			<Button
				disabled={hasTasks}
				outlined
				label="Delete"
				icon="pi pi-trash"
				className="text-red-500 border-red-500 dark:text-red-400 dark:border-red-400 "
				onClick={() => onDelete(category)}
				tooltip={
					hasTasks
						? 'Cannot delete category while tasks are assigned.'
						: undefined
				}
				tooltipOptions={tooltipOptions}
			/>
			<Button
				label="Edit"
				icon="pi pi-pencil"
				outlined
				onClick={() => onEdit(category)}
				className="text-teal-700 border-teal-700 dark:text-teal-400 dark:border-teal-400"
			/>
		</div>
	);

	return (
		<Card
			title={header}
			footer={footer}
			subTitle={subTitle}
			className="bg-white rounded-lg p-4 h-full justify-between border-2 border-gray-200 dark:border-0"
		>
			{content}
		</Card>
	);
};

export default CategoryCard;
