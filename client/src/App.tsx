import './App.css';
import { AuthProvider } from '@context/AuthProvider';
import ThemeProvider from '@context/ThemeProvider';
import UserProvider from '@context/UserProvider';
import ViewPortProvider from '@context/ViewPortProvider';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import Calendar from './features/calendar/Calendar';
import Categories from './features/categories/Categories';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/login/Login';
import Settings from './features/settings/Settings';
import Tasks from './features/tasks/Tasks';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="flex flex-col min-h-screen">
                  <UserProvider>
                    <ViewPortProvider>
                      <ThemeProvider>
                        <Header />
                        <div className="flex flex-1 dark:text-white bg-white text-black dark:bg-zinc-900">
                          <Sidebar />
                          <div className="flex-1 xl:mx-auto px-8 pb-8 max-w-screen-2xl">
                            <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="tasks" element={<Tasks />} />
                              <Route path="calendar" element={<Calendar />} />
                              <Route path="settings" element={<Settings />} />
                              <Route
                                path="categories"
                                element={<Categories />}
                              />
                            </Routes>
                          </div>
                        </div>
                        <Footer />
                      </ThemeProvider>
                    </ViewPortProvider>
                  </UserProvider>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
