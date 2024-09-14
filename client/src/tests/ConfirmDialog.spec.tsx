import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConfirmDialog from '../components/ConfirmDialog';
import type { ConfirmDialogProps } from '../components/ConfirmDialog';

const mockDefaultProps: ConfirmDialogProps = {
	visible: true,
	handleHiding: vi.fn(),
	content: 'Are you sure?',
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

	it('should render footer when it is provided', () => {
		renderComponent({ footer: <button>Delete</button> });

		expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
	});
});
