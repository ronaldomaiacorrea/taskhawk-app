import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Status, Task } from '@shared/types';
import PageTitle from 'src/common/PageTitle';
import { backgroundColors } from '@constants';
import { Tooltip } from 'primereact/tooltip';
// import { useMonthTasks } from '@queries/tasks';

const tasks: Task[] = [
	{
		id: 1,
		title: 'Design Homepage',
		description: 'Create a responsive design for the homepage.',
		creationDate: new Date('2024-10-12T14:30:00'),
		dueDate: new Date('2024-10-12T19:30:00'),
		priority: 'High',
		status: Status.IN_PROGRESS,
		categoryId: 1,
	},
	{
		id: 2,
		title: 'Home work',
		description: 'Do the homework',
		creationDate: new Date('2024-10-09T14:30:00'),
		dueDate: new Date('2024-10-10T14:30:00'),
		priority: 'Medium',
		status: Status.OVERDUE,
		categoryId: 1,
	},
];

const Calendar = () => {
	// const { data: tasks } = useMonthTasks();

	// const [initialView, setInitialView] = useState('dayGridMonth');

	return (
		<>
			<PageTitle>Calendar</PageTitle>
			<Tooltip />
			<FullCalendar
				locale={'en'}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
				}}
				eventTimeFormat={{
					hour: '2-digit',
					minute: '2-digit',
					meridiem: false,
				}}
				titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
				plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
				initialView={'dayGridMonth'}
				events={tasks.map((task) => ({
					title: task.title,
					start: task.creationDate.toISOString(),
					end: task.dueDate.toISOString(),
					description: task.description,
					backgroundColor: backgroundColors[task.status],
					borderColor: backgroundColors[task.status],
				}))}
				allDaySlot={false}
				height={1000}
				timeZone="local"
				dayMaxEvents
				editable
				listDayFormat={{ weekday: 'long' }}
				displayEventTime
				eventOrder="start,title"
				moreLinkClick="popover"
				navLinks
				handleWindowResize
				stickyHeaderDates
				eventClick={(info) => console.log(info.event.title)}
			/>
		</>
	);
};

export default Calendar;
