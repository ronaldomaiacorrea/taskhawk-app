import { useState } from 'react';
import { Card } from 'primereact/card';
import { getUpcomingTasks, dateTemplate } from '@utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Task } from '@shared/types';
import { Button } from 'primereact/button';
import { ConfirmDialog } from '@common';
import { Toolbar } from 'primereact/toolbar';
import EmptyData from 'src/common/EmptyData';

interface UpcomingProps {
	tasks: Task[];
}

const Upcoming = ({ tasks }: UpcomingProps) => {
	const [visible, setVisible] = useState(false);
	const [selectedTasks, setSelectedTasks] = useState<Task[] | null>(null);

	const checkButton = (
		<Button
			icon="pi pi-check"
			label="Mark as completed"
			outlined
			disabled={!selectedTasks || selectedTasks.length === 0}
			onClick={() => {
				if (!selectedTasks) return;
				setVisible(true);
			}}
		/>
	);

	const dialogContent = (
		<>
			<p className="py-4">Are you want to mark these tasks as completed?</p>
			<ul>
				{selectedTasks?.map((task) => (
					<li key={task.id} className="p-1 px-2">
						{task.title}
					</li>
				))}
			</ul>
		</>
	);

	const dueDateTemplate = (rowData: Task) => dateTemplate(rowData.dueDate);

	return (
		<>
			<Card
				title="Upcoming deadlines"
				subTitle="Tasks approaching their due dates."
			>
				<div className="border-b border-gray-300 mb-4" />
				{tasks.length > 0 && (
					<Toolbar className="mb-4" start={checkButton}></Toolbar>
				)}
				<DataTable
					stripedRows
					value={getUpcomingTasks(tasks)}
					paginator
					emptyMessage={<EmptyData message="No tasks defined." />}
					rows={5}
					rowsPerPageOptions={[5, 10, 20]}
					selection={selectedTasks}
					onSelectionChange={(e) => setSelectedTasks(e.value as Task[] | null)}
				>
					<Column
						selectionMode="multiple"
						headerStyle={{ width: '3rem' }}
					></Column>
					<Column field="title" header="Title"></Column>
					<Column body={dueDateTemplate} header="Due Date"></Column>
				</DataTable>
			</Card>
			<div className="w-3/4">
				<ConfirmDialog
					header="Confirm task completion"
					visible={visible}
					handleHiding={() => {
						if (!visible) return;
						setVisible(false);
					}}
					content={dialogContent}
					onConfirm={() => setVisible(false)}
				/>
			</div>
		</>
	);
};

export default Upcoming;
