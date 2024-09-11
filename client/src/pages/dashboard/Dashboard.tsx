import { Divider } from 'primereact/divider';
import PageTitle from '../../components/PageTitle';
import Overview from './Overview';
import Upcoming from './Upcoming';
import TasksCompletedTime from './TasksCompletedTime';
import TasksPerPriority from './TasksPerPriority';

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-6">
			<PageTitle>Dashboard</PageTitle>
			<div className="flex flex-col space-y-8 align-center justify-evenly space-x-0 lg:flex-row lg:space-y-0 lg:space-x-8">
				<Overview />
				<Divider layout="vertical" className="hidden lg:block" />
				<Upcoming />
			</div>
			<Divider layout="horizontal" className="hidden lg:block" />
			<div className="flex flex-col space-y-8 align-center justify-evenly space-x-0 lg:flex-row lg:space-y-0 lg:space-x-8">
				<TasksCompletedTime />
				<Divider layout="vertical" className="hidden lg:block" />
				<TasksPerPriority />
			</div>
		</div>
	);
};

export default Dashboard;
