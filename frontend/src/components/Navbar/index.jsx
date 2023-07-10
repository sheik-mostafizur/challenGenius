import {useState} from "react";
import {BsFillMoonStarsFill} from "react-icons/bs";
import {Link, NavLink} from "react-router-dom";
import {uesAuthContext} from "../../context/AuthContext";
import Button from "../Button";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {user, logOutUser, handleThemeSwitch, isDark} = uesAuthContext();

  const handleNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const linkStyle =
    "block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:hover:text-gray-900 md:dark:hover:bg-transparent md:dark:hover:text-white";
  const linkStyleActive =
    "block rounded py-2 pl-3 pr-4 text-primary-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:hover:text-gray-900 md:dark:hover:bg-transparent md:dark:hover:text-white";
  return (
    <nav className="border-gray-200 px-2 py-2 shadow dark:border-gray-600 dark:bg-gray-900 sm:px-4 md:py-2">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex flex-grow items-center md:flex-grow-0">
          <img
            src={`${isDark ? "/logo-dark.svg" : "/logo-light.svg"}`}
            className="w-28 text-white"
            alt=""
          />
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
              <NavLink
                to="/"
                className={({isActive}) =>
                  isActive ? linkStyleActive : linkStyle
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({isActive}) =>
                  isActive ? linkStyleActive : linkStyle
                }>
                Courses
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="relative flex items-center gap-4">
          {user?.email ? (
            <div className="flex items-center md:order-2">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.photoURL}
                  alt="user photo"
                />
              </button>
              <div
                className={`${
                  showMenu ? "" : "hidden"
                } absolute right-0 top-full z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700`}
                id="user-dropdown">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user?.displayName}
                  </span>
                  <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li className="flex items-center gap-x-4 px-4">
                    <span className="text-sm dark:text-gray-50">
                      {isDark ? "Light" : "Dark"}
                    </span>
                    <BsFillMoonStarsFill
                      className="ml-3 h-7  w-7 cursor-pointer p-1 text-gray-700 dark:text-white md:ml-0 md:hover:text-gray-900 md:dark:hover:text-gray-400"
                      onClick={handleThemeSwitch}
                    />
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logOutUser()
                          .then(() => {})
                          .catch((e) => {
                            console.log(e);
                          });
                      }}
                      className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button text="Login" />
              </Link>
              <BsFillMoonStarsFill
                className="ml-3 h-8  w-8 cursor-pointer p-1 text-2xl text-gray-700 dark:text-white
            md:ml-0 md:hover:text-gray-900 md:dark:hover:text-gray-400"
                onClick={handleThemeSwitch}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
