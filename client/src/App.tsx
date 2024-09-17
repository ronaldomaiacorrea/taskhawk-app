import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex flex-col min-h-screen">
				<Header />
				<div className="flex flex-1">
					<Sidebar />
					<Main />
				</div>
				<Footer />
			</div>
		</QueryClientProvider>
	);
}

export default App;
