import {Navigate, useLocation} from "react-router-dom";
import {uesAuthContext} from "../context/AuthContext";
import LoaderSpinner from "../components/LoaderSpinner";

const PrivateRoute = ({children}) => {
  const {user, loading} = uesAuthContext();
  const location = useLocation();

  if (loading) return <LoaderSpinner />;

  if (user) return children;

  return <Navigate to="/login" state={{from: location}} replace />;
};

export default PrivateRoute;
