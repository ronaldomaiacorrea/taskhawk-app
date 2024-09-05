import { Task } from './types';

export const getOverviewChartData = (data: Task[]) => {
	const labels = ['Completed', 'Pending', 'Block', 'In progress'];
	const dataValues = [0, 0, 0, 0];

	data.forEach((task) => {
		switch (task.status) {
			case 'Completed':
				dataValues[0]++;
				break;
			case 'To do':
				dataValues[1]++;
				break;
			case 'Blocked':
				dataValues[2]++;
				break;
			case 'In progress':
				dataValues[3]++;
				break;
			case 'On hold':
				dataValues[4]++;
				break;
			case 'Canceled':
				dataValues[5]++;
				break;
			case 'Overdue':
				dataValues[6]++;
				break;
			default:
				break;
		}
	});

	return {
		labels,
		datasets: [
			{
				data: dataValues,
				backgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'],
				hoverBackgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'],
			},
		],
	};
};
