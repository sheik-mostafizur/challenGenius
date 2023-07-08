const Button = (props) => {
  const {type, className, text, handleClick, size = "base", rounded} = props;

  const btnStyle = {
    xs: `${
      rounded ? "rounded-full" : "rounded-lg"
    } bg-primary-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`,
    sm: `${
      rounded ? "rounded-full" : "rounded-lg"
    } bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`,
    base: `${
      rounded ? "rounded-full" : "rounded-lg"
    } bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`,
    lg: `${
      rounded ? "rounded-full" : "rounded-lg"
    } bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`,
    xl: `${
      rounded ? "rounded-full" : "rounded-lg"
    } bg-primary-700 px-6 py-3.5 text-center text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`,
  };
  const linkStyle = (size) => {
    size = size.toLowerCase();
    if (size === "xs") {
      return btnStyle.xs;
    } else if (size === "sm") {
      return btnStyle.sm;
    } else if (size === "lg") {
      return btnStyle.lg;
    } else if (size === "xl") {
      return btnStyle.xl;
    }
    return btnStyle.base;
  };
  return (
    <button
      type={type || "button"}
      className={`${linkStyle(size)} ${className}`}
      onClick={handleClick}>
      {text || "Button"}
    </button>
  );
};

export default Button;
