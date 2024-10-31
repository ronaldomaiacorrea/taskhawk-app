import { Task } from '@shared/types';
import { Card } from 'primereact/card';
// import { Chart } from 'primereact/chart';

interface TasksCompletedTimeProps {
	tasks: Task[];
}

const TasksCompletedTime = ({ tasks }: TasksCompletedTimeProps) => {
	console.log(tasks);
	return (
		<Card
			title="Completed tasks overtime"
			subTitle="Number of completed tasks each month."
			className="rounded-none"
		>
			<div className="border-b border-gray-300 mb-4"></div>
			<div className="flex flex-row justify-center items-center">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, ratione a,
				amet distinctio voluptatem at sint tempore nesciunt fugiat quae
				temporibus, obcaecati voluptas omnis nobis excepturi quis. Dolor, minima
				consectetur.
			</div>
		</Card>
	);
};

export default TasksCompletedTime;
