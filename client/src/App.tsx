import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Categories from './pages/categories/Categories';
import Tasks from './pages/tasks/Tasks';
import Settings from './pages/settings/Settings';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex flex-col min-h-screen">
				<Header />
				<div className="flex flex-1 dark:bg-black dark:text-white bg-white text-black">
					<Sidebar />
					<div className="flex-1 xl:mx-auto px-8 pb-8 max-w-screen-2xl">
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="tasks" element={<Tasks />} />
							<Route path="settings" element={<Settings />} />
							<Route path="categories" element={<Categories />} />
						</Routes>
					</div>
				</div>
				<Footer />
			</div>
		</QueryClientProvider>
	);
}

export default App;
