import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminUsers from "../pages/Admin/AdminUsers";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import AdminCourses from "../pages/Admin/AdminCourses";
import AdminModules from "../pages/Admin/AdminModules";
import AdminCoursesAdd from "../pages/Admin/AdminCourses/AdminCoursesAdd";
import AdminCoursesUpdate from "../pages/Admin/AdminCourses/AdminCoursesUpdate";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },

      // for admin
      {
        path: "users",
        element: (
          <PrivateRouteAdmin>
            <AdminUsers />
          </PrivateRouteAdmin>
        ),
      },
      // courses
      {
        path: "courses",
        element: (
          <PrivateRouteAdmin>
            <AdminCourses />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "courses/add",
        element: (
          <PrivateRouteAdmin>
            <AdminCoursesAdd />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "courses/update/:id",
        element: (
          <PrivateRouteAdmin>
            <AdminCoursesUpdate />
          </PrivateRouteAdmin>
        ),
        loader: ({params}) => axios.get(`/admin/courses/${params.id}`),
      },
      {
        path: "courses/:id",
        element: (
          <PrivateRouteAdmin>
            <AdminModules />
          </PrivateRouteAdmin>
        ),
      },
    ],
  },
]);
export default router;
