import {Link} from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="container mx-auto h-screen md:flex items-center justify-center">
      <div className="text-center my-8">
        <h1 className="font-bold text-3xl md:text-5xl mb-8 text-primary">
          404 Page not found!
        </h1>
        <Link
          to="/"
          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary dark:hover:bg-primary focus:outline-none dark:focus:ring-primary">
          go home
        </Link>
      </div>
      <div>
        <img
          className="w-full max-w-3xl"
          src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg"
          alt="error 404 page"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
