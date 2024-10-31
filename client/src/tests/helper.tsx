import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const queryClient = createTestQueryClient();

const renderWithClient = (ui: ReactElement, options?: RenderOptions) => {
	const Providers = ({ children }: { children: ReactNode }) => {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
	};
	return {
		...render(ui, { wrapper: Providers, ...options }),
	};
};

export {
	render,
	fireEvent,
	screen,
	waitFor,
	within,
	renderHook,
} from '@testing-library/react';
export { renderWithClient };