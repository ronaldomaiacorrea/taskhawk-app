import { sidebarLinks } from '@utils';
import FormattedLink from '../common/FormattedLink';

const Sidebar = () => (
  <nav className="w-min-64 bg-gray-800 text-white sm:flex flex-col sm:w-16 md:w-56 p-4 shrink-0 hidden">
    <ul className="space-y-4">
      {sidebarLinks().map(({ path, pageName, icon }) => (
        <FormattedLink key={path} path={path} pageName={pageName} icon={icon} />
      ))}
    </ul>
  </nav>
);

export default Sidebar;
