import { Panel } from 'primereact/panel';
import { classNames } from 'primereact/utils';

const Upcoming = () => {
	return (
		<div className="flex-1">
			<Panel
				header="Upcoming tasks"
				pt={{
					header: {
						className: classNames('bg-teal-800 text-white'),
					},
				}}
			>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem quisquam
					labore qui fugit distinctio dolore nisi veritatis vel cum? Vero culpa
					earum porro suscipit quia reiciendis iste minus veniam nulla?
				</p>
			</Panel>
		</div>
	);
};

export default Upcoming;
