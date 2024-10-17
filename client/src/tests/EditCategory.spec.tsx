import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import type { EditCategoryProps } from '@pages/categories/EditCategory';
import EditCategory from '@pages/categories/EditCategory';
import userEvent from '@testing-library/user-event';
import { ICON } from '@shared/types';

const defaultProps: EditCategoryProps = {
	category: {
		id: 1,
		name: 'Work',
		icon: ICON.Briefcase,
		description: 'Category for work-related tasks',
	},
	isVisible: true,
	closeDialog: vi.fn(),
	onUpdateCategory: vi.fn(),
};

const renderComponent = (props: Partial<EditCategoryProps> = {}) =>
	render(<EditCategory {...defaultProps} {...props} />);

const getCancelButton = () => screen.getByRole('button', { name: 'Cancel' });
const getSaveButton = () => screen.getByRole('button', { name: 'Save' });
const getNameField = () => screen.getByRole('textbox', { name: 'Name' });
const getDescriptionField = () =>
	screen.getByRole('textbox', { name: 'Description' });

describe('<EditCategory />', () => {
	it('should render the component with fields', async () => {
		renderComponent();

		expect(getCancelButton()).toBeInTheDocument();
		expect(getSaveButton()).toBeInTheDocument();
		expect(
			screen.getByRole('dialog', {
				name: `Edit ${defaultProps.category.name} category`,
			})
		).toBeInTheDocument();
		expect(getNameField()).toHaveValue(defaultProps.category.name);

		expect(getDescriptionField()).toHaveValue(
			defaultProps.category.description
		);

		expect(screen.queryAllByRole('textbox')[2]).toHaveValue(
			defaultProps.category.icon
		);
	});

	it('should call closeDialog when clicking cancel', async () => {
		renderComponent();

		userEvent.click(getCancelButton());

		await waitFor(() => expect(defaultProps.closeDialog).toHaveBeenCalled());
	});

	it('should call onUpdateCategory when clicking save', async () => {
		renderComponent();

		userEvent.clear(getNameField());
		userEvent.clear(getDescriptionField());
		await userEvent.type(getNameField(), 'Personal');

		await userEvent.type(getDescriptionField(), 'General personal activities');
		userEvent.click(getSaveButton());

		await waitFor(() =>
			expect(defaultProps.onUpdateCategory).toHaveBeenCalledWith({
				description: 'General personal activities',
				icon: 'pi pi-briefcase',
				id: 1,
				name: 'Personal',
			})
		);
	});

	it('should reset the form when closing the dialog', async () => {
		renderComponent();

		userEvent.clear(getNameField());
		userEvent.clear(getDescriptionField());

		await userEvent.type(getNameField(), 'Personal');
		await userEvent.type(getDescriptionField(), 'General personal activities');

		userEvent.click(getCancelButton());

		await waitFor(() => {
			expect(getNameField()).toHaveValue(defaultProps.category.name);
			expect(getDescriptionField()).toHaveValue(
				defaultProps.category.description
			);
		});
	});

	it('should render error messages when submitting a form with empty name', async () => {
		const onUpdateCategorySpy = vi.fn();
		renderComponent({ onUpdateCategory: onUpdateCategorySpy });

		await userEvent.clear(getNameField());

		userEvent.click(getSaveButton());

		await waitFor(() => {
			expect(getNameField()).toHaveAccessibleDescription(
				'Please provide a category name.'
			);

			expect(onUpdateCategorySpy).not.toHaveBeenCalled();
		});
	});

	it('should render error message when submitting form with a name field with more than 30 characters', async () => {
		const onUpdateCategorySpy = vi.fn();
		renderComponent({ onUpdateCategory: onUpdateCategorySpy });

		await userEvent.clear(getNameField());
		await userEvent.type(getNameField(), 'a'.repeat(31));

		userEvent.click(getSaveButton());

		await waitFor(() => {
			expect(getNameField()).toHaveAccessibleDescription(
				'Category name must not exceed 30 characters.'
			);

			expect(onUpdateCategorySpy).not.toHaveBeenCalled();
		});
	});

	it('should render error message when submitting form with a description field with more than 100 characters', async () => {
		const onUpdateCategorySpy = vi.fn();
		renderComponent({ onUpdateCategory: onUpdateCategorySpy });

		await userEvent.type(getDescriptionField(), 'a'.repeat(101));

		userEvent.click(getSaveButton());

		await waitFor(() => {
			expect(
				screen.getByText('Category description must not exceed 100 characters.')
			).toBeInTheDocument();
		});
		expect(onUpdateCategorySpy).not.toHaveBeenCalled();
	});
});
