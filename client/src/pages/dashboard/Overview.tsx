import { Panel } from 'primereact/panel';
import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { TasksContext } from '../../context/TasksProvider';
import { Chart } from 'primereact/chart';
import { getOverviewChartData } from '../../utils/getOverviewChartData';
import { TasksContextType } from '../../utils/types';

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
			<Panel
				header="Overview"
				pt={{
					header: {
						className: classNames('bg-teal-800 text-white'),
					},
				}}
			>
				<div className="flex flex-row justify-center items-center">
					<div
						className="w-3/4h-full"
						style={{
							position: 'relative',
							height: '20vh',
							width: '40vw',
							minWidth: '250px',
							minHeight: '300px',
						}}
					>
						{panelContent()}
					</div>
				</div>
			</Panel>
		</>
	);
};

export default Overview;
