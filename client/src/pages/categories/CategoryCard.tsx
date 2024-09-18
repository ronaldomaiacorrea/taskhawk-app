import { Card } from 'primereact/card';
import { Category } from '../../utils/types';
import { Button } from 'primereact/button';

interface CategoryCardProps extends Category {}

const CategoryCard = ({ id, name, icon, description }: CategoryCardProps) => {
	const header = (
		<>
			<i className={icon} style={{ fontSize: '2rem' }}></i>
			<h2 className="text-xl font-semibold">{name}</h2>
		</>
	);
	const footer = (
		<div>
			<Button>Delete</Button>
			<Button>Edit</Button>
		</div>
	);

	const content = (
		<div>
			<p>{description}</p>
			<ul>
				<li>Task 1</li>
				<li>Task 2</li>
				<li>Task 3</li>
			</ul>
		</div>
	);

	return (
		<Card title={header} footer={footer}>
			{content}
		</Card>
	);
};

export default CategoryCard;
