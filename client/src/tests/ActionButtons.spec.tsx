import { ActionButtons } from '@common';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import type { ActionButtonsProps } from '@common';

const defaultProps: ActionButtonsProps = {
  handleCloseDialog: vi.fn(),
  handleSubmit: vi.fn(),
  handleResetForm: vi.fn(),
};

const renderComponent = (props: Partial<ActionButtonsProps> = {}) =>
  render(<ActionButtons {...defaultProps} {...props} />);

const getCancelButton = () => screen.getByRole('button', { name: 'Cancel' });
const getSaveButton = () => screen.getByRole('button', { name: 'Save' });

describe('<ActionButtons />', () => {
  it('should render the component', () => {
    renderComponent();
    expect(getCancelButton()).toBeInTheDocument();
    expect(getSaveButton()).toBeInTheDocument();
  });

  it('should call handleCloseDialog and handleResetForm when clicking cancel', async () => {
    const handleCloseDialog = vi.fn();
    const handleResetForm = vi.fn();
    renderComponent({ handleCloseDialog, handleResetForm });

    userEvent.click(getCancelButton());

    await waitFor(() => expect(handleCloseDialog).toHaveBeenCalled());
    expect(handleResetForm).toHaveBeenCalled();
  });

  it('should call handleSubmit when clicking save', async () => {
    const handleSubmit = vi.fn();

    renderComponent({ handleSubmit });

    userEvent.click(getSaveButton());

    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
  });
});
