import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import CategoryCard, {
	CategoryCardProps,
} from '../pages/categories/CategoryCard';
import { TasksContext } from '../context/TasksProvider';
import { Status, Task } from '../../../shared/types';
import userEvent from '@testing-library/user-event';

const defaultProps: CategoryCardProps = {
	id: 1,
	name: 'Work',
	icon: 'pi pi-briefcase',
	description: 'Category for work-related tasks',
	onDelete: vi.fn(),
	onEdit: vi.fn(),
};

const mockTasks: Task[] = [
	{
		id: 1,
		title: 'Task 1',
		categoryId: 1,
		creationDate: new Date(),
		dueDate: new Date(),
		priority: 'High',
		status: Status.TO_DO,
	},
	{
		id: 2,
		title: 'Task 2',
		categoryId: 2,
		creationDate: new Date(),
		dueDate: new Date(),
		priority: 'High',
		status: Status.COMPLETED,
	},
	{
		id: 3,
		title: 'Task 3',
		categoryId: 3,
		creationDate: new Date(),
		dueDate: new Date(),
		priority: 'High',
		status: Status.BLOCKED,
	},
];

const renderComponent = (props: Partial<CategoryCardProps> = {}) =>
	render(
		<TasksContext.Provider value={{ tasks: mockTasks }}>
			<CategoryCard {...defaultProps} {...props} />
		</TasksContext.Provider>
	);

const getDeleteButton = () => screen.getByRole('button', { name: 'Delete' });
const getEditButton = () => screen.getByRole('button', { name: 'Edit' });

describe('<CategoryCard />', () => {
	it('should render category card with tasks', async () => {
		renderComponent();

		expect(screen.getByRole('heading', { name: 'Work' })).toBeInTheDocument();
		expect(
			screen.getByText('Category for work-related tasks')
		).toBeInTheDocument();

		const listItems = screen.getAllByRole('listitem');
		const expectedTasks = ['Task 1', 'Task 2', 'Task 3'];

		listItems.forEach((item, index) => {
			expect(item).toHaveTextContent(expectedTasks[index]);
		});
	});

	it('should render No tasks associated message', async () => {
		render(
			<TasksContext.Provider value={{ tasks: [] }}>
				<CategoryCard {...defaultProps} />
			</TasksContext.Provider>
		);

		expect(
			screen.getByText('No tasks associated with this category.')
		).toBeInTheDocument();
	});

	it('should render disabled delete and edit buttons when tasks are assigned', async () => {
		renderComponent();

		expect(getDeleteButton()).toBeDisabled();
		expect(getEditButton()).toBeDisabled();
	});

	it('should show tooltip when hovering over disabled buttons', async () => {
		renderComponent();

		fireEvent.mouseOver(getDeleteButton());
		await waitFor(() =>
			expect(
				screen.queryAllByAltText(
					'Cannot delete category while tasks are assigned.'
				)
			).toHaveLength(0)
		);

		fireEvent.mouseOver(getEditButton());
		await waitFor(() =>
			expect(
				screen.queryAllByAltText(
					'Cannot edit category while tasks are assigned.'
				)
			).toHaveLength(0)
		);
	});

	it('should enable delete and edit buttons when no tasks are assigned', async () => {
		render(
			<TasksContext.Provider value={{ tasks: [] }}>
				<CategoryCard {...defaultProps} />
			</TasksContext.Provider>
		);
		expect(getDeleteButton()).toBeEnabled();
		expect(getEditButton()).toBeEnabled();
	});

	it('should not show tooltip when hovering over enabled buttons', async () => {
		renderComponent();

		fireEvent.mouseOver(getDeleteButton());
		expect(
			screen.queryByText('Cannot delete category while tasks are assigned.')
		).not.toBeInTheDocument();

		fireEvent.mouseOver(getEditButton());
		expect(screen.queryByText('Cannot edit category while tasks are assigned.'))
			.not.toBeInTheDocument;
	});

	it('should call onDelete or onEdit functions when user clicks on delete or edit', async () => {
		const onEditSpy = vi.fn();
		const onDeleteSpy = vi.fn();

		render(
			<TasksContext.Provider value={{ tasks: [] }}>
				<CategoryCard
					{...defaultProps}
					onDelete={onDeleteSpy}
					onEdit={onEditSpy}
				/>
			</TasksContext.Provider>
		);

		userEvent.click(getDeleteButton());
		await waitFor(() => expect(onDeleteSpy).toHaveBeenCalledWith(1));

		// Click edit button
		userEvent.click(getEditButton());
		await waitFor(() => expect(onEditSpy).toHaveBeenCalledWith(1));
	});
});
