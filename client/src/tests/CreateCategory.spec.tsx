import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import type { CreateCategoryProps } from '@pages/categories/CreateCategory';
import CreateCategory from '@pages/categories/CreateCategory';
import userEvent from '@testing-library/user-event';
import { ICON } from '@shared/types';

const defaultProps: CreateCategoryProps = {	
	isVisible: true,
	closeDialog: vi.fn(),
	onCreateCategory: vi.fn(),
};

const renderComponent = (props: Partial<CreateCategoryProps> = {}) =>
	render(<CreateCategory {...defaultProps} {...props} />);

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
				name: 'Add category',
			})
		).toBeInTheDocument();
		expect(getNameField()).toHaveValue('');

		expect(getDescriptionField()).toHaveValue('');

		expect(screen.queryAllByRole('textbox')[2]).toHaveValue(
			ICON.QuestionCircle
		);
	});

	it('should call closeDialog when clicking cancel', async () => {
		renderComponent();

		userEvent.click(getCancelButton());

		await waitFor(() => expect(defaultProps.closeDialog).toHaveBeenCalled());
	});

	it('should call onCreateCategory when clicking save', async () => {
		const onCreateCategorySpy = vi.fn();
		renderComponent({ onCreateCategory: onCreateCategorySpy });

		await userEvent.type(getNameField(), 'Personal');
		await userEvent.type(getDescriptionField(), 'General personal activities');

		userEvent.click(getSaveButton());

		await waitFor(() =>
			expect(onCreateCategorySpy).toHaveBeenCalledWith({
				description: 'General personal activities',
				icon: ICON.QuestionCircle,
				name: 'Personal',
			})
		);
	});

	it('should reset the form when closing the dialog', async () => {
		renderComponent();

		await userEvent.type(getNameField(), 'Personal');
		await userEvent.type(getDescriptionField(), 'General personal activities');

		userEvent.click(getCancelButton());

		await waitFor(() => {
			expect(getNameField()).toHaveValue('');
			expect(getDescriptionField()).toHaveValue('');
		});
	});

	it('should render error messages when submitting a form with empty name', async () => {
		const onCreateCategorySpy = vi.fn();
		renderComponent({ onCreateCategory: onCreateCategorySpy });

		userEvent.click(getSaveButton());

		await waitFor(() => {
			expect(getNameField()).toHaveAccessibleDescription(
				'Please provide a category name.'
			);

			expect(onCreateCategorySpy).not.toHaveBeenCalled();
		});
	});

	it('should render error message when submitting form with a name field with more than 10 characters', async () => {
		const onCreateCategorySpy = vi.fn();
		renderComponent({ onCreateCategory: onCreateCategorySpy });

		await userEvent.clear(getNameField());
		await userEvent.type(getNameField(), 'a'.repeat(11));

		userEvent.click(getSaveButton());

		await waitFor(() => {
			expect(getNameField()).toHaveAccessibleDescription(
				'Category name must not exceed 10 characters.'
			);

			expect(onCreateCategorySpy).not.toHaveBeenCalled();
		});
	});

	it('should render error message when submitting form with a description field with more than 100 characters', async () => {
		const onCreateCategorySpy = vi.fn();
		renderComponent({ onCreateCategory: onCreateCategorySpy });

		await userEvent.type(getDescriptionField(), 'a'.repeat(101));

		userEvent.click(getSaveButton());

		await waitFor(() => {
			expect(
				screen.getByText('Category description must not exceed 100 characters.')
			).toBeInTheDocument();
		});
		expect(onCreateCategorySpy).not.toHaveBeenCalled();
	});
});
