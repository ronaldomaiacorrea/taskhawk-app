import { Divider } from 'primereact/divider';
import PageTitle from '../../components/PageTitle';
import Overview from './Overview';
import Upcoming from './Upcoming';

const Dashboard = () => {
	return (
		<>
			<PageTitle>Dashboard</PageTitle>
			<div className="flex flex-col space-y-8 align-center justify-evenly space-x-0 lg:flex-row lg:space-y-0 lg:space-x-8">
				<div className="flex-1">
					<Overview />
				</div>
				<Divider layout="vertical" className="hidden lg:block" />
				<div className="flex-2">
					<Upcoming />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
