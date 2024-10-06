import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Status, Task } from '@shared/types';
import { getEventColor } from '@utils/getEventColor';
import { Dropdown } from 'primereact/dropdown';
import PageTitle from '@components/PageTitle';

const tasks: Task[] = [
	{
		id: 1,
		title: 'Design Homepage',
		description: 'Create a responsive design for the homepage.',
		creationDate: new Date(1725177600000),
		dueDate: new Date(1725181200000),
		priority: 'High',
		status: Status.IN_PROGRESS,
		categoryId: 1,
	},
	{
		id: 2,
		title: 'Home work',
		description: 'Do the homework',
		creationDate: new Date('2024-09-01'),
		dueDate: new Date(1728597600000),
		priority: 'Medium',
		status: Status.IN_PROGRESS,
		categoryId: 1,
	},
];

type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

interface View {
	label: string;
	value: CalendarView;
}

const viewOptions: View[] = [
	{
		label: 'Month',
		value: 'dayGridMonth',
	},
	{
		label: 'Week',
		value: 'timeGridWeek',
	},
	{
		label: 'Day',
		value: 'timeGridDay',
	},
];

export interface CaledarProps {
	tasks: Task[];
}

const Calendar = () => {
	const [selectedView, setSelectedView] = useState<View | null>(null);
	const calendarRef = useRef<FullCalendar | null>(null);

	useEffect(() => {
		const calendar = calendarRef.current?.getApi();
		if (calendar && selectedView?.value) {
			calendar.changeView(selectedView.value);
		}
	}, [selectedView]);

	return (
		<>
			<PageTitle>Calendar</PageTitle>
			<div className="flex flex-col gap-6 ">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold">
						{selectedView?.label ? `${selectedView.label} view` : 'Month view'}
					</h1>
					<Dropdown
						value={selectedView?.value}
						options={viewOptions}
						onChange={(e) => {
							const newView = viewOptions.find(
								(view) => view.value === e.value
							);
							if (newView) {
								setSelectedView(newView);
							}
						}}
						placeholder="Select a view"
						className="my-4"
					/>
				</div>
				<FullCalendar
					ref={calendarRef}
					plugins={[dayGridPlugin, timeGridPlugin]}
					initialView={selectedView?.value || 'dayGridMonth'}
					events={tasks.map((task) => ({
						title: task.title,
						start: task.creationDate.toString(),
						end: task.dueDate,
						description: task.description,
						backgroundColor: getEventColor(task.priority),
						borderColor: getEventColor(task.priority),
					}))}
					allDaySlot={false}
					height={1000}
					timeZone="local"
				/>
			</div>
		</>
	);
};

export default Calendar;
