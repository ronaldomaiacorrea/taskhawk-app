import { Card } from 'primereact/card';
import type { Category, Task } from '@shared/types';
import { useMemo, useRef, useState } from 'react';
import EmptyData from 'src/common/EmptyData';
import { useTasks } from '@queries';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export interface CategoryCardProps {
	category: Category;
	onDelete: (category: Category) => void;
	onEdit: (category: Category) => void;
}

const CategoryCard = ({ category, onDelete, onEdit }: CategoryCardProps) => {
	const { id, name, description, icon } = category;
	const { data: tasks = [] } = useTasks();
	const [showTasksDialog, setShowTasksDialog] = useState(false);
	const menuRef = useRef<OverlayPanel>(null);

	const filteredTasks = useMemo(
		() => tasks.filter((task: Task) => task.categoryId === id),
		[tasks, id]
	);

	const hasTasks = filteredTasks.length > 0;

	const subtitle = <h3 className="text-xl font-bold text-center">{name}</h3>;

	const header = (
		<div className="flex items-center">
			<div className="flex flex-grow justify-center items-center ml-5">
				<i className={icon} style={{ fontSize: '2rem' }}></i>
			</div>
			<i
				className="pi pi-ellipsis-v cursor-pointer text-2xl hover:text-teal-400"
				onClick={(e) => menuRef.current?.toggle(e)}
				aria-label="Options"
			></i>
			<OverlayPanel ref={menuRef} dismissable>
				<div className="flex flex-col gap-2">
					<div
						className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
						onClick={() => setShowTasksDialog(true)}
						aria-disabled={hasTasks}
					>
						<i className="pi pi-list-check text-black dark:text-white"></i>
						<span className="text-black dark:text-white">Tasks</span>
					</div>
					{hasTasks && (
						<Tooltip
							target="#editDeleteTooltipContainer"
							content="Categories with assigned tasks cannot be edited or deleted."
						/>
					)}
					<div id="editDeleteTooltipContainer" className="flex flex-col gap-2">
						<div
							className={`flex items-center gap-2 p-2 rounded ${
								hasTasks
									? 'cursor-not-allowed opacity-50'
									: 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
							}`}
							onClick={!hasTasks ? () => onEdit(category) : undefined}
						>
							<i className="pi pi-pencil text-teal-700 dark:text-teal-400"></i>
							<span className="text-teal-700 dark:text-teal-400">Edit</span>
						</div>
						<div
							className={`flex items-center gap-2 p-2 rounded ${
								hasTasks
									? 'cursor-not-allowed opacity-50'
									: 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
							}`}
							onClick={!hasTasks ? () => onDelete(category) : undefined}
						>
							<i className="pi pi-trash text-red-500 dark:text-red-400"></i>
							<span className="text-red-500 dark:text-red-400">Delete</span>
						</div>
					</div>
				</div>
			</OverlayPanel>
		</div>
	);

	return (
		<>
			<Card
				title={header}
				className="bg-white rounded-lg p-4 h-full justify-between border-2 border-gray-200 dark:border-0"
				subTitle={subtitle}
			>
				<p className="text-xl text-center">{description}</p>
			</Card>
			<Dialog
				header="Tasks"
				visible={showTasksDialog}
				onHide={() => setShowTasksDialog(false)}
				footer={<Button label="Ok" onClick={() => setShowTasksDialog(false)} />}
			>
				<ul className="px-2 py-1">
					{hasTasks ? (
						filteredTasks.map((task: Task) => (
							<li key={task.id}>
								<div className="flex items-center gap-2">
									<i className="pi pi-check-circle"></i>
									{task.title}
								</div>
							</li>
						))
					) : (
						<EmptyData message="No tasks associated with this category." />
					)}
				</ul>
			</Dialog>
		</>
	);
};

export default CategoryCard;
