import { useContext } from 'react';
import { TasksContext } from '../../context/TasksProvider';
import { Chart } from 'primereact/chart';
import { getOverviewChartData } from '../../utils/getOverviewChartData';
import { TasksContextType } from '../../../../shared/types';
import { Card } from 'primereact/card';
import CardTitle from '../../components/CardTitle';

const Overview = () => {
	const { tasks } = useContext<TasksContextType>(TasksContext);
	const { chartData, options } = getOverviewChartData(tasks);

	return (
		<Card
			title={<CardTitle title="Status overview" />}
			className="rounded-none"
			subTitle="Breakdown of tasks by status categories."
		>
			<div className="border-b border-gray-300 mb-4" />
			<div className="flex flex-row justify-center items-center">
				<div
					className="w-3/4 h-full"
					style={{
						position: 'relative',
						height: '10vh',
						minHeight: '300px',
					}}
				>
					<Chart type="pie" data={chartData} options={options} />
				</div>
			</div>
		</Card>
	);
};

export default Overview;
