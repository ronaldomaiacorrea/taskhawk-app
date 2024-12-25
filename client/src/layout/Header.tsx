import { ViewPortContext } from '@context/ViewPortProvider';
import { sidebarLinks } from '@utils';
import { Button } from 'primereact/button';
import { Sidebar as SideBarPrime } from 'primereact/sidebar';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskHawkLogo from '../assets/TaskHawk_Logo_Transparent.png';

const Header = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const viewPortWidth = useContext<number>(ViewPortContext);

  useEffect(() => {
    if (viewPortWidth > 640) {
      setIsSideBarVisible(false);
    }
  }, [viewPortWidth]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 to-teal-800/90 px-8 shadow-md shadow-teal-500/50 backdrop-blur-md">
        <div className="mx-auto sm:h-auto h-16 flex flex-row justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="font-bold hidden sm:block">
              <img src={TaskHawkLogo} width={60} alt="Task Hawk logo" />
            </div>
            <div className="text-xl font-bold text-white">Task Hawk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div>User and Logout</div>
            <div className="sm:hidden">
              <Button
                icon="pi pi-bars"
                outlined
                onClick={() => setIsSideBarVisible(true)}
                className="bg-teal-900 border-teal-900 dark:bg-teal-900 dark:border-teal-900 text-teal-500 dark:text-teal-400"
              />
            </div>
          </div>
        </div>
      </header>
      <SideBarPrime
        visible={isSideBarVisible}
        onHide={() => setIsSideBarVisible(false)}
        position="left"
      >
        {sidebarLinks().map(({ path, pageName, icon }) => (
          <li className="flex items-center" key={path}>
            <Link
              to={path}
              onClick={() => setIsSideBarVisible(false)}
              className="hover:text-teal-500 md:hover:bg-gray-700 md:hover:px-3 py-2 rounded-lg flex items-center gap-2 w-full text-xl"
            >
              <i className={`pi ${icon} text-xl`} />
              <span className="md:inline ml-2 ">{pageName}</span>
            </Link>
          </li>
        ))}
      </SideBarPrime>
    </>
  );
};

export default Header;
