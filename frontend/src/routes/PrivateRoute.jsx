import {Navigate, useLocation} from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import {uesAuthContext} from "../context/AuthContext";

const PrivateRoute = ({children}) => {
  const {user, loading} = uesAuthContext();
  const location = useLocation();

  if (loading) return <LoaderSpinner />;

  if (user) return children;

  return <Navigate to="/login" state={{from: location}} replace />;
};

export default PrivateRoute;
