import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi, Mock } from 'vitest';
import CategoryCard, {
	CategoryCardProps,
} from 'src/features/categories/components/CategoryCard';
import type { Task } from '@shared/types';
import { ICON, Status } from '@shared/types';
import userEvent from '@testing-library/user-event';
import { useTasks } from '@queries';
import { beforeEach } from 'node:test';

const defaultProps: CategoryCardProps = {
	category: {
		id: 1,
		name: 'Work',
		icon: ICON.Briefcase,
		description: 'Category for work-related tasks',
	},
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

vi.mock('@queries', async () => {
	return {
		useTasks: vi.fn(),
	};
});

const renderComponent = (props: Partial<CategoryCardProps> = {}) =>
	render(<CategoryCard {...defaultProps} {...props} />);

const getDeleteButton = () => screen.getByRole('button', { name: 'Delete' });
const getEditButton = () => screen.getByRole('button', { name: 'Edit' });

describe('<CategoryCard />', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('should render category card with tasks', async () => {
		(useTasks as Mock).mockReturnValue({
			data: mockTasks,
		});
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

	it('should render "No tasks associated" message', async () => {
		(useTasks as Mock).mockReturnValue({
			data: [],
		});
		renderComponent();

		expect(
			screen.getByText('No tasks associated with this category.')
		).toBeInTheDocument();
	});

	it('should render disabled delete when tasks are assigned', async () => {
		(useTasks as Mock).mockReturnValue({
			data: mockTasks,
		});
		renderComponent();

		expect(getDeleteButton()).toBeDisabled();
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
		(useTasks as Mock).mockReturnValue({
			data: [],
		});
		renderComponent();
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

	it('should call onEdit function when user clicks on Edit button', async () => {
		const onEditSpy = vi.fn();

		renderComponent({ onEdit: onEditSpy });

		userEvent.click(getEditButton());
		await waitFor(() =>
			expect(onEditSpy).toHaveBeenCalledWith({
				id: 1,
				name: 'Work',
				icon: ICON.Briefcase,
				description: 'Category for work-related tasks',
			})
		);
	});

	it('should render confirmation dialog when user clicks on Delete button', async () => {
		const onDeleteSpy = vi.fn();

		renderComponent({ onDelete: onDeleteSpy });

		userEvent.click(getDeleteButton());

		await waitFor(() =>
			expect(onDeleteSpy).toHaveBeenCalledWith({
				id: 1,
				name: 'Work',
				icon: ICON.Briefcase,
				description: 'Category for work-related tasks',
			})
		);
	});
});
