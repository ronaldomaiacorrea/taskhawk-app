import { hexToRgba } from './convertHexToRgba';
import { Task } from './types';
import { Status } from './types';
import { TooltipItem } from 'chart.js';

export const getOverviewChartData = (data: Task[] | undefined) => {
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
			tooltip: {
				boxPadding: 5,
				callbacks: {
					label: function (tooltipItem: TooltipItem<'pie'>) {
						const data = tooltipItem.dataset.data as number[];
						const currentValue = data[tooltipItem.dataIndex as number];

						const total = data.reduce(
							(acc: number, value: number) => acc + value,
							0
						);
						const percentage = ((currentValue / total) * 100).toFixed(2);

						return `${percentage}%`;
					},
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
