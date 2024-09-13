import { useContext, useState } from 'react';
import CardTitle from '../../components/CardTitle';
import { Card } from 'primereact/card';
import { TasksContext } from '../../context/TasksProvider';
import { getUpcomingTasks } from '../../utils/getUpcomingTasks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Task } from '../../utils/types';
import { Button } from 'primereact/button';
import ConfirmDialog from '../../components/ConfirmDialog';

const Upcoming = () => {
	const { tasks } = useContext(TasksContext);
	const [visible, setVisible] = useState(false);
	const [task, setTask] = useState('');

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

	const checkComplete = (rowData: Task) => {
		return (
			<Button
				icon="pi pi-check"
				rounded
				text
				onClick={() => {
					setVisible(true);
					setTask(rowData.title);

					// TODO: Change task status to complete
				}}
			/>
		);
	};

	return (
		<div className="flex-1">
			<Card
				title={<CardTitle title="Upcoming deadlines" />}
				subTitle="Tasks approaching their due dates."
			>
				<div className="border-b border-gray-300 mb-4" />
				<DataTable
					stripedRows
					value={getUpcomingTasks(tasks)}
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 20]}
				>
					<Column field="title" header="Title"></Column>
					<Column body={dueDateTemplate} header="Due Date"></Column>
					<Column field="priority" header="Priority" sortable></Column>
					<Column field="status" header="Status" sortable></Column>
					<Column
						body={checkComplete}
						style={{ flex: '0 0 4rem' }}
						header="Confirm completion"
					></Column>
				</DataTable>
			</Card>
			<div className="w-3/4">
				<ConfirmDialog
					// header="Confirm task completion"
					visible={visible}
					handleHiding={() => {
						if (!visible) return;
						setVisible(false);
					}}
					text={`Are you sure you want to mark ${task} as completed?`}
					footer={footerContent}
				/>
			</div>
		</div>
	);
};

export default Upcoming;
