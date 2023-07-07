import { useState} from "react";
import {AiFillHome} from "react-icons/ai";
import {BsFillMoonStarsFill} from "react-icons/bs";
import {FaSignOutAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import { uesAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const {user, logOut, handleThemeSwitch} = uesAuthContext();

  const handleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="border-gray-200 px-2 py-2 shadow dark:border-gray-600 dark:bg-gray-900 sm:px-4 md:py-0">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex flex-grow items-center md:flex-grow-0">
          {/* <img
            src={isDark ? logoDark.url : logoLight.url}
            alt={isDark ? logoDark?.alt : logoLight.alt}
            width={"100"}
          /> */}
        </Link>
        <button
          type="button"
          className="order-1 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          onClick={handleNavbar}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"></path>
          </svg>
        </button>
        <div
          className={`${showNavbar ? "" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="my-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:my-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:bg-transparent md:p-0 md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <Link to="/">
                <AiFillHome
                  className="ml-3 h-8 w-8 cursor-pointer rounded-full p-1 text-2xl text-gray-700 shadow hover:bg-gray-100 dark:bg-gray-600
              dark:text-gray-400  dark:hover:text-white md:ml-0 md:hover:text-gray-900  md:dark:hover:text-white"
                />
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:hover:text-gray-900 md:dark:hover:bg-transparent md:dark:hover:text-white">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <BsFillMoonStarsFill
            className="ml-3 h-8  w-8 cursor-pointer p-1 text-2xl text-gray-700 dark:text-gray-400 
            md:ml-0 md:hover:text-gray-900 md:dark:hover:text-white"
            onClick={handleThemeSwitch}
          />
          {user?.email && (
            <FaSignOutAlt
              title={user?.email}
              onClick={() =>
                logOut()
                  .then(() => window.location.reload())
                  .catch((error) => console.log(error))
              }
              className="cursor-pointer text-2xl"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
