import { Card } from 'primereact/card';
import { Category, Task } from '../../utils/types';
import { Button } from 'primereact/button';
import { useTasks } from '../../queries/tasks';
import { ScrollPanel } from 'primereact/scrollpanel';

interface CategoryCardProps extends Category {}

const CategoryCard = ({ id, name, icon, description }: CategoryCardProps) => {
	const { data: tasks = [] } = useTasks();
	const hasTasks = tasks.some((task: Task) => task.categoryId === id);

	const content = (
		<>
			<p className="pb-1 font-bold">Current tasks:</p>
			<ScrollPanel
				style={{ width: '100%', height: '100px' }}
				className="border-2 border-gray-200"
			>
				<ul className="px-2 py-1">
					{hasTasks ? (
						tasks
							.filter((task: Task) => task.categoryId === id)
							.map((task: Task) => <li key={task.id}>{task.title}</li>)
					) : (
						<p className="text-center font-thin">
							No tasks associated with this category.
						</p>
					)}
				</ul>
			</ScrollPanel>
		</>
	);

	const header = (
		<div className="flex flex-col items-center gap-4">
			<i className={icon} style={{ fontSize: '2rem' }}></i>
			<h3 className="text-xl text-slate-900">{name}</h3>
		</div>
	);

	const subTitle = <p className="text-xl text-center">{description}</p>;

	const footer = (
		<div className="flex flex-row items-center justify-end gap-2">
			<Button disabled={hasTasks} outlined>
				Delete
			</Button>
			<Button>Edit</Button>
		</div>
	);

	// const content = <div className="flex flex-col gap-2">{renderTasks()}</div>;

	return (
		<Card
			title={header}
			footer={footer}
			subTitle={subTitle}
			className="bg-white shadow rounded-lg p-4 h-120px items-center justify-between border-2 border-gray-200"
		>
			{content}
		</Card>
	);
};

export default CategoryCard;
