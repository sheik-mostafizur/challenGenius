import {AiFillHome} from "react-icons/ai";
import {GiSkills} from "react-icons/gi";
import {Link} from "react-router-dom";

const DashboardNav = ({showMenu}) => {
  return (
    <aside
      id="default-sidebar"
      className={`${
        showMenu ? "" : "-translate-x-full"
      } fixed left-0 top-0 z-40 h-screen w-64 transition-transform sm:translate-x-0 `}
      aria-label="Sidebar">
      <div className="h-full overflow-y-auto bg-white/30 px-3 py-4 backdrop-blur-xl dark:bg-gray-900">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <AiFillHome className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className="ml-3   dark:text-gray-400">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3  dark:text-gray-400">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="demo"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <GiSkills className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className="ml-3  dark:text-gray-400">Demo</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardNav;
