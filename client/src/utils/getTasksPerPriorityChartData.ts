import { Task } from '../../../shared/types';

export const getTasksPerPriorityChartData = (tasks: Task[] | undefined) => {
	const options = {
		indexAxis: 'y',
		maintainAspectRatio: false,
		aspectRatio: 0.8,
	};

	const chartData = {
		labels: ['Low', 'Medium', 'High'],
		datasets: [
			{
				label: 'Tasks per priority',
				data: [
					tasks?.filter((task) => task.priority === 'Low').length,
					tasks?.filter((task) => task.priority === 'Medium').length,
					tasks?.filter((task) => task.priority === 'High').length,
				],
				backgroundColor: ['#FFC107', '#FF5722', '#F44336'],
			},
		],
	};

	return { chartData, options };
};
