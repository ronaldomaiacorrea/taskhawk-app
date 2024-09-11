import CardTitle from '../../components/CardTitle';
import { Card } from 'primereact/card';

const Upcoming = () => {
	return (
		<div className="flex-1">
			<Card
				title={<CardTitle title="Upcoming deadlines" />}
				subTitle="Tasks approaching their due dates."
			>
				<div className="border-b border-gray-300 mb-4" />
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem quisquam
					labore qui fugit distinctio dolore nisi veritatis vel cum? Vero culpa
					earum porro suscipit quia reiciendis iste minus veniam nulla?
				</p>
			</Card>
		</div>
	);
};

export default Upcoming;
