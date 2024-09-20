import { useContext, useState } from 'react';
import CardTitle from '../../components/CardTitle';
import { Card } from 'primereact/card';
import { TasksContext } from '../../context/TasksProvider';
import { getUpcomingTasks } from '../../utils/getUpcomingTasks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Task } from '../../../../shared/types';
import { Button } from 'primereact/button';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Toolbar } from 'primereact/toolbar';

const Upcoming = () => {
	const { tasks } = useContext(TasksContext);
	const [visible, setVisible] = useState(false);
	const [selectedTasks, setSelectedTasks] = useState<Task[] | null>(null);

	const dueDateTemplate = (rowData: Task) => {
		const date = new Date(rowData.dueDate);

		const dateOptions: Intl.DateTimeFormatOptions = {
			month: '2-digit',
			day: '2-digit',
			year: '2-digit',
			weekday: 'long',
		};
		const timeOptions: Intl.DateTimeFormatOptions = {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		};
		const formattedDate = date.toLocaleDateString(undefined, dateOptions);
		const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

		return `${formattedDate}, ${formattedTime}`;
	};

	const footerContent = (
		<>
			<Button
				label="No"
				icon="pi pi-times"
				onClick={() => setVisible(false)}
				autoFocus
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				text
				onClick={() => setVisible(false)}
				severity="secondary"
			/>
		</>
	);

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

	return (
		<>
			<Card
				title={<CardTitle title="Upcoming deadlines" />}
				subTitle="Tasks approaching their due dates."
			>
				<div className="border-b border-gray-300 mb-4" />
				<Toolbar className="mb-4" start={checkButton}></Toolbar>
				<DataTable
					stripedRows
					value={getUpcomingTasks(tasks)}
					paginator
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
					footer={footerContent}
				/>
			</div>
		</>
	);
};

export default Upcoming;
