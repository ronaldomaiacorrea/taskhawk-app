import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import App from './App.tsx';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import TasksProvider from './context/TasksProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
			<QueryClientProvider client={queryClient}>
				<TasksProvider>
					<App />
				</TasksProvider>
				<ReactQueryDevtools initialIsOpen={false} position="right" />
			</QueryClientProvider>
		</PrimeReactProvider>
	</React.StrictMode>
);
