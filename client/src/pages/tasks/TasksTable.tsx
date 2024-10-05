import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import type { DataTableExpandedRows } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EmptyData from '@components/EmptyData';
import { dateTemplate } from '@utils/dateTemplate';
import { Category, Task } from '@shared/types';
import StatusBadge from '@components/StatusBadge';
import PriorityBadge from '@components/PriorityBadge';

export interface TasksTableProps {
	tasks: Task[];
	categories: Category[];
}

const TasksTable = ({ tasks, categories }: TasksTableProps) => {
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
			rows={5}
			rowsPerPageOptions={[5, 10, 20]}
			resizableColumns
			rowExpansionTemplate={descriptionTemplate}
			expandedRows={expandedRows}
			onRowToggle={(e) => setExpandedRows(e.data)}
			dataKey="id"
			scrollable
		>
			<Column
				expander={allowExpansion}
				style={{ width: '2rem' }}
				frozen
				// alignFrozen="right"
			/>
			<Column field="title" header="Name" sortable frozen />
			<Column
				body={(task: Task) => dateTemplate(task.creationDate)}
				header="Creation date"
				sortable
				style={{ minWidth: '250px' }}
			/>
			<Column
				body={(task: Task) => dateTemplate(task.dueDate)}
				header="Due date"
				sortable
				style={{ minWidth: '250px' }}
			/>
			<Column
				body={(task: Task) => <PriorityBadge task={task} />}
				header="Priority"
				sortable
				style={{ minWidth: '120px' }}
			/>
			<Column
				body={(task: Task) => <StatusBadge task={task} />}
				header="Status"
				sortable
				style={{ minWidth: '150px' }}
			/>
			<Column
				body={categoryTemplate}
				header="Category"
				sortable
				style={{ minWidth: '150px' }}
			/>
		</DataTable>
	);
};

export default TasksTable;
