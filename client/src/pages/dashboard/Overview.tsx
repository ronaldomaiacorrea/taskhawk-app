import { Panel } from 'primereact/panel';
import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { TasksContext } from '../../context/TasksProvider';
import { Chart } from 'primereact/chart';
import { getOverviewChartData } from '../../utils/getOverviewChartData';

const Overview = () => {
	const { tasks, isLoading, error } = useContext(TasksContext);

	const panelContent = () => {
		if (isLoading) {
			return <p>Loading...</p>;
		}

		return <Chart type="pie" data={getOverviewChartData(tasks)} />;
	};

	return (
		<div className="flex-1">
			<Panel
				header="Overview"
				pt={{
					header: {
						className: classNames('bg-teal-800 text-white'),
					},
				}}
			>
				<div className="flex flex-row justify-center">{panelContent()}</div>
			</Panel>
		</div>
	);
};

export default Overview;
