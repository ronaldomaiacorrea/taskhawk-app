import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConfirmDialog from '@components/ConfirmDialog';
import type { ConfirmDialogProps } from '@components/ConfirmDialog';
import userEvent from '@testing-library/user-event';

const mockDefaultProps: ConfirmDialogProps = {
	visible: true,
	handleHiding: vi.fn(),
	content: 'Are you sure?',
	onConfirm: vi.fn()
};

const renderComponent = (props: Partial<ConfirmDialogProps> = {}) =>
	render(<ConfirmDialog {...mockDefaultProps} {...props} />);

describe('<ConfirmDialog />', () => {
	it('should render default header when modal is visible', () => {
		renderComponent();

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Confirm modal')).toBeInTheDocument();
	});

	it('should render header when it is provided', () => {
		renderComponent({ header: 'Confirm deletion' });

		expect(screen.getByText('Confirm deletion')).toBeInTheDocument();
	});

	it('should render text when it is provided', () => {
		renderComponent({ content: 'Are you sure you want to delete this item?' });

		expect(
			screen.getByText('Are you sure you want to delete this item?')
		).toBeInTheDocument();
	});

	it('should call onConfirm when user confirms operation',  async () => {
		const onConfirmSpy = vi.fn();
		renderComponent({ onConfirm: onConfirmSpy })

		await userEvent.click(screen.getByRole('button', { name: 'Yes' }));

		expect(onConfirmSpy).toHaveBeenCalled();
	});
});
