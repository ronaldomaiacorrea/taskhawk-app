import { Card } from 'primereact/card';
import CardTitle from '../../components/CardTitle';
import { useContext } from 'react';
import { TasksContext } from '../../context/TasksProvider';
import { Chart } from 'primereact/chart';
import { getTasksPerPriorityChartData } from '../../utils/getTasksPerPriorityChartData';

const TasksPerPriority = () => {
	const { tasks } = useContext(TasksContext);
	const { chartData, options } = getTasksPerPriorityChartData(tasks);

	return (
		<Card
			title={<CardTitle title="Tasks per priority" />}
			className="rounded-none"
			subTitle="Number of tasks per priority."
		>
			<div className="border-b border-gray-300 mb-4"></div>
			<div className="flex flex-row justify-center items-center">
				<Chart type="bar" data={chartData} options={options} />
			</div>
		</Card>
	);
};

export default TasksPerPriority;
