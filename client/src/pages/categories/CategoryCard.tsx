import { Card } from 'primereact/card';
import { Category, Task } from '../../utils/types';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions';
import { useContext } from 'react';
import { TasksContext } from '../../context/TasksProvider';

export interface CategoryCardProps extends Category {
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

const CategoryCard = ({
	id,
	name,
	icon,
	description,
	onDelete,
	onEdit,
}: CategoryCardProps) => {
	const { tasks = [] } = useContext(TasksContext);
	const filteredTasks = tasks.filter((task: Task) => task.categoryId === id);
	const hasTasks = filteredTasks.length > 0;

	const tooltipOptions: TooltipOptions = {
		position: 'top',
		event: 'hover',
		showOnDisabled: true,
	};

	const header = (
		<div className="flex flex-col items-center gap-4">
			<i className={icon} style={{ fontSize: '2rem' }}></i>
			<h3 className="text-xl text-slate-900">{name}</h3>
		</div>
	);

	const subTitle = <p className="text-xl text-center">{description}</p>;

	const content = (
		<>
			<p className="pb-1 font-bold">Current tasks:</p>
			<ScrollPanel
				style={{ width: '100%', height: '100px' }}
				className="border-2 border-gray-200"
			>
				<ul className="px-2 py-1">
					{hasTasks ? (
						filteredTasks.map((task: Task) => (
							<li key={task.id}>{task.title}</li>
						))
					) : (
						<p className="text-center font-thin">
							No tasks associated with this category.
						</p>
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
				severity="danger"
				onClick={() => onDelete(id)}
				tooltip={
					hasTasks
						? 'Cannot delete category while tasks are assigned.'
						: undefined
				}
				tooltipOptions={tooltipOptions}
			>
				Delete
			</Button>
			<Button
				disabled={hasTasks}
				onClick={() => onEdit(id)}
				tooltip={
					hasTasks
						? 'Cannot edit category while tasks are assigned.'
						: undefined
				}
				tooltipOptions={{
					position: 'top',
					event: 'hover',
					showOnDisabled: true,
				}}
			>
				Edit
			</Button>
		</div>
	);

	return (
		<Card
			title={header}
			footer={footer}
			subTitle={subTitle}
			className="bg-white shadow rounded-lg p-4 h-120px items-center justify-between border-2 border-gray-200"
		>
			{content}
		</Card>
	);
};

export default CategoryCard;
