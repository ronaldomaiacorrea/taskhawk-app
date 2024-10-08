import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import type { DataTableExpandedRows } from 'primereact/datatable';
import { Column, ColumnSortEvent } from 'primereact/column';
import EmptyData from '@components/EmptyData';
import { dateTemplate } from '@utils/dateTemplate';
import { Category, Task } from '@shared/types';
import StatusBadge from '@components/StatusBadge';
import PriorityBadge from '@components/PriorityBadge';

export interface TasksTableProps {
	tasks: Task[];
	categories: Category[];
	selectedTask: Task | null;
}

const TasksTable = ({ tasks, categories, selectedTask }: TasksTableProps) => {
	const [expandedRows, setExpandedRows] = useState<
		DataTableExpandedRows | Task[]
	>([]);

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
			selectionMode="single"
			selection={selectedTask}
			removableSort
			// onSelectionChange={(e) => selectTask(e.value)}
		>
			<Column selectionMode="single" headerStyle={{ width: '3rem' }} />
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
