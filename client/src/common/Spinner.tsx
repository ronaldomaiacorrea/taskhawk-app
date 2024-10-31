import { ProgressSpinner } from 'primereact/progressspinner';

const Spinner = () => {
	return (
		<ProgressSpinner
			style={{ width: '100px', height: '100px' }}
			strokeWidth="8"
			animationDuration=".5s"
			aria-label="Loading"
		/>
	);
};

export default Spinner;
