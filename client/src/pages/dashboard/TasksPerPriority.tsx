import { Card } from 'primereact/card';
import CardTitle from '../../components/CardTitle';

const TasksPerPriority = () => {
	return (
		<Card
			title={<CardTitle title="Tasks per priority" />}
			className="rounded-none"
			subTitle="Number of tasks per priority."
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

export default TasksPerPriority;
