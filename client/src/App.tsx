import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<div className="flex">
				<Sidebar />
				<Main />
			</div>
			<Footer />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
