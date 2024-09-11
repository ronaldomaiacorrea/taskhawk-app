import { useContext } from 'react';
import { TasksContext } from '../../context/TasksProvider';
import { Chart } from 'primereact/chart';
import { getOverviewChartData } from '../../utils/getOverviewChartData';
import { TasksContextType } from '../../utils/types';
import { Card } from 'primereact/card';
import CardTitle from '../../components/CardTitle';

const Overview = () => {
	const { tasks, isLoading, error, isError } =
		useContext<TasksContextType>(TasksContext);
	const { chartData, options } = getOverviewChartData(tasks);

	const panelContent = () => {
		if (isLoading) {
			return <p>Loading...</p>;
		}

		return <Chart type="pie" data={chartData} options={options} />;
	};

	return (
		<>
			{isError && <p>Error: {error?.message}</p>}
			<Card title={<CardTitle title="Overview" />} className="rounded-none">
				<div className="border-b border-gray-300 mb-4" />
				<div className="flex flex-row justify-center items-center">
					<div
						className="w-3/4h-full"
						style={{
							position: 'relative',
							height: '10vh',
							width: '40vw',
							minWidth: '150px',
							minHeight: '300px',
						}}
					>
						{panelContent()}
					</div>
				</div>
			</Card>
		</>
	);
};

export default Overview;
