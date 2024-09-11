import { hexToRgba } from './convertHexToRgba';
import { Task } from './types';
import { Status } from './types';

export const getOverviewChartData = (data: Task[]) => {
	const labels = Object.values(Status);
	const dataValues = new Array(7).fill(0);

	const statusIndexMap: Record<Status, number> = {
		[Status.COMPLETED]: 0,
		[Status.TO_DO]: 1,
		[Status.BLOCKED]: 2,
		[Status.IN_PROGRESS]: 3,
		[Status.OVERDUE]: 4,
	};

	data?.forEach((task) => {
		const index = statusIndexMap[task.status];
		if (index !== undefined) {
			dataValues[index]++;
		}
	});

	const backgroundColors = [
		'#808080', // "To do" - Gray
		'#4CAF50', // "Completed" - Green
		'#FF5733', // "Blocked" - Orange
		'#FF0000', // "Overdue" - Red
		'#2196F3', // "In progress" - Blue
	];

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				text: 'Status',
				borderRadius: 10,
				labels: {
					usePointStyle: true,
				},
			},
		},
	};

	const chartData = {
		labels,
		datasets: [
			{
				data: dataValues,
				backgroundColor: backgroundColors,
				borderWidth: 2,
				hoverBackgroundColor: backgroundColors.map((color) =>
					hexToRgba(color, 0.8)
				),
				hoverBorderColor: backgroundColors.map((color) => hexToRgba(color, 1)),
			},
		],
	};

	return { chartData, options };
};
