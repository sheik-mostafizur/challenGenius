import {Helmet} from "react-helmet-async";
import {useState} from "react";
import DashboardNav from "./DashboardNav";
import {Outlet} from "react-router-dom";
import {uesAuthContext} from "../../context/AuthContext";

const Dashboard = () => {
  const {isDark} = uesAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={isDark ? "dark" : ""}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <button
        onClick={() => setShowMenu(!showMenu)}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ms-auto block rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden">
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <DashboardNav showMenu={showMenu} />
      <div className="min-h-screen p-4 dark:bg-slate-800 dark:text-gray-400 sm:ml-64">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
