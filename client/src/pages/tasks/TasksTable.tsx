import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import type { DataTableExpandedRows } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EmptyData from '@components/EmptyData';
import { dateTemplate } from '@utils/dateTemplate';
import { Category, Task } from '@shared/types';
import StatusBadge from '@components/StatusBadge';
import PriorityBadge from '@components/PriorityBadge';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export interface TasksTableProps {
	tasks: Task[];
	categories: Category[];
	deleteTasks: (tasks: Task[]) => void;
}

const TasksTable = ({ tasks, categories, deleteTasks }: TasksTableProps) => {
	const [expandedRows, setExpandedRows] = useState<
		DataTableExpandedRows | Task[] | undefined
	>(undefined);
	const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

	const descriptionTemplate = (task: Task) => {
		return task.description ? (
			<>
				<div className="font-bold p-2">Description</div>
				<div className="pl-2">{task.description}</div>
			</>
		) : (
			<EmptyData message="This task has no description." />
		);
	};

	const allowExpansion = () => tasks.length > 0;

	const expandAll = () => {
		const _expandedRows: DataTableExpandedRows = {};

		tasks.forEach((task) => (_expandedRows[`${task.id}`] = true));

		setExpandedRows(_expandedRows);
	};

	const collapseAll = () => {
		setExpandedRows(undefined);
	};

	// const priorityOptions = [
	// 	{
	// 		label: 'HIGH',
	// 		value: 'High',
	// 	},
	// 	{
	// 		label: 'MEDIUM',
	// 		value: 'Medium',
	// 	},
	// 	{
	// 		label: 'LOW',
	// 		value: 'Low',
	// 	},
	// ];

	const categoryTemplate = (task: Task) => {
		const taskCategory = categories.find(
			(category) => category.id === task.categoryId
		);

		return (
			<>
				<i className={`${taskCategory?.icon} pr-2`} />
				{taskCategory?.name}
			</>
		);
	};

	const header = (
		<div className="flex md:flex-row md:justify-end justify-between gap-2 flex-col flex-wrap">
			<div className="md:flex-auto">
				<div className="relative w-full ">
					<InputText placeholder="Keyword Search" className="pl-10 w-full" />
					<i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
				</div>
			</div>
			<div className="flex flex-row md:justify-end justify-between gap-2">
				<div>
					<Button
						icon="pi pi-trash"
						severity="danger"
						outlined
						disabled={selectedTasks.length === 0}
						onClick={() => deleteTasks(selectedTasks)}
					>
						<span className="hidden sm:inline mx-2">Delete</span>
					</Button>
				</div>
				<div className="flex flex-row justify-end">
					<div>
						<Button icon="pi pi-plus" onClick={expandAll} text>
							<span className="hidden sm:inline mx-2">Expand All</span>
						</Button>
					</div>
					<div>
						<Button icon="pi pi-minus" onClick={collapseAll} text>
							<span className="hidden sm:inline mx-2">Collapse All</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<DataTable
			value={tasks}
			emptyMessage={<EmptyData message="No tasks defined." />}
			paginator
			onRowExpand={(e) => setExpandedRows(e.data)}
			rows={5}
			rowsPerPageOptions={[5, 10, 20]}
			resizableColumns
			rowExpansionTemplate={descriptionTemplate}
			expandedRows={expandedRows}
			onRowToggle={(e) => setExpandedRows(e.data)}
			dataKey="id"
			scrollable
			selectionMode="checkbox"
			selection={selectedTasks}
			removableSort
			header={header}
			onSelectionChange={(e) => setSelectedTasks(e.value as Task[])}
		>
			<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
			<Column expander={allowExpansion} style={{ width: '2rem' }} frozen />
			<Column field="title" header="Name" sortable frozen />
			<Column
				body={(task: Task) => dateTemplate(task.creationDate)}
				header="Creation date"
				sortField="creationDate"
				sortable
				style={{ minWidth: '250px' }}
			/>
			<Column
				body={(task: Task) => dateTemplate(task.dueDate)}
				header="Due date"
				sortField="dueDate"
				sortable
				style={{ minWidth: '250px' }}
			/>
			<Column
				body={(task: Task) => <PriorityBadge task={task} />}
				header="Priority"
				style={{ minWidth: '120px' }}
				sortable
				sortField="priority"
			/>
			<Column
				body={(task: Task) => <StatusBadge task={task} />}
				header="Status"
				sortable
				sortField="status"
				style={{ minWidth: '150px' }}
			/>
			<Column
				body={categoryTemplate}
				header="Category"
				sortable
				sortField="categoryId"
				style={{ minWidth: '150px' }}
			/>
		</DataTable>
	);
};

export default TasksTable;
