import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import Categories from './features/categories/Categories';
import Tasks from './features/tasks/Tasks';
import Settings from './features/settings/Settings';
import Calendar from './features/calendar/Calendar';
import { AuthProvider } from '@context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './features/login/Login'; // Updated import path

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<div className="flex flex-col min-h-screen">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route
							path="/*"
							element={
								<PrivateRoute>
									<div className="flex flex-col min-h-screen">
										<Header />
										<div className="flex flex-1 dark:bg-black dark:text-white bg-white text-black">
											<Sidebar />
											<div className="flex-1 xl:mx-auto px-8 pb-8 max-w-screen-2xl">
												<Routes>
													<Route path="/" element={<Dashboard />} />
													<Route path="tasks" element={<Tasks />} />
													<Route path="calendar" element={<Calendar />} />
													<Route path="settings" element={<Settings />} />
													<Route path="categories" element={<Categories />} />
												</Routes>
											</div>
										</div>
										<Footer />
									</div>
								</PrivateRoute>
							}
						/>
					</Routes>
				</div>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
