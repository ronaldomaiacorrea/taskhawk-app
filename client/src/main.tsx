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
import { BrowserRouter } from 'react-router-dom';
import DarkModeProvider from './context/DarkModeProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
			<QueryClientProvider client={queryClient}>
				<DarkModeProvider>
					<TasksProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</TasksProvider>
				</DarkModeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</PrimeReactProvider>
	</React.StrictMode>
);
