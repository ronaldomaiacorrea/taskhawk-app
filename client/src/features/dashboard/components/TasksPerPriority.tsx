import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { getTasksPerPriorityChartData } from '@utils';
import EmptyData from 'src/common/EmptyData';
import { Task } from '@shared/types';

interface TasksPerPriorityProps {
	tasks: Task[];
}

const TasksPerPriority = ({ tasks }: TasksPerPriorityProps) => {
	const { chartData, options } = getTasksPerPriorityChartData(tasks);

	return (
		<Card
			title="Tasks per priority"
			className="rounded-none"
			subTitle="Number of tasks per priority."
		>
			<div className="border-b border-gray-300 mb-4"></div>
			<div className="flex flex-row justify-center items-center">
				{chartData?.datasets?.[0]?.data?.some((item) => item !== 0) ? (
					<Chart type="bar" data={chartData} options={options} />
				) : (
					<EmptyData message="No tasks defined." />
				)}
			</div>
		</Card>
	);
};

export default TasksPerPriority;
