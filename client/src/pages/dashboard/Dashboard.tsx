import PageTitle from '../../components/PageTitle';
import Overview from './Overview';
import Upcoming from './Upcoming';

const Dashboard = () => {
	return (
		<>
			<PageTitle>Dashboard</PageTitle>
			<div className="flex flex-col space-y-8 align-center justify-evenly space-x-0 md:flex-row md:space-y-0 md:space-x-8">
				<div className="flex-1">
					<Overview />
				</div>
				<Upcoming />
			</div>
		</>
	);
};

export default Dashboard;
