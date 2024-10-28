import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from '@layout';

const renderComponent = () => render(<Footer />);

describe('<Footer />', () => {
	beforeAll(() => {
		window.scrollTo = vi.fn();
	});

	it('should render the version in the footer', () => {
		renderComponent();

		expect(screen.getByText('Version 0.0.1')).toBeInTheDocument();
	});

	it('should render the author LinkedIn link', () => {
		renderComponent();

		expect(
			screen.getByRole('link', { name: 'Author LinkedIn' })
		).toHaveAttribute('href', 'https://www.linkedin.com/in/ronaldomaiacorrea');
	});

	it('should render the author GitHub link', () => {
		renderComponent();

		expect(screen.getByRole('link', { name: 'Author GitHub' })).toHaveAttribute(
			'href',
			'https://github.com/ronaldomaiacorrea'
		);
	});

	it('should render the author email link', () => {
		renderComponent();

		expect(screen.getByRole('link', { name: 'Author email' })).toHaveAttribute(
			'href',
			'mailto:rmcdeveloper@outlook.com'
		);
	});

	it('should show the scroll up button when scrolled down', () => {
		renderComponent();

		fireEvent.scroll(window, { target: { scrollY: 400 } });

		expect(
			screen.getByRole('button', { name: /Scroll to top/i })
		).toBeInTheDocument();
	});

	it('should scroll to top when the scroll up button is clicked', async () => {
		const scrollToMock = vi.fn();
		window.scrollTo = scrollToMock;
		renderComponent();

		fireEvent.scroll(window, { target: { scrollY: 400 } });

		userEvent.click(
			screen.getByRole('button', {
				name: /Scroll to top/i,
			})
		);

		await waitFor(() =>
			expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
		);
	});
});
