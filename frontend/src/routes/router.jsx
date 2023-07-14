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
import AdminModulesAdd from "../pages/Admin/AdminModules/AdminModulesAdd";
import AdminModulesUpdate from "../pages/Admin/AdminModules/AdminModulesUpdate";
import Courses from "../pages/Courses";
import Enroll from "../pages/Enroll";

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
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/enroll/:id",
    element: (
      <PrivateRoute>
        <Enroll />
      </PrivateRoute>
    ),
    loader: ({params}) => axios.get(`/courses/${params.id}/`),
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
      // modules
      {
        path: "courses/:id/modules/add",
        element: (
          <PrivateRouteAdmin>
            <AdminModulesAdd />
          </PrivateRouteAdmin>
        ),
        loader: ({params}) =>
          axios.get(`/admin/courses/${params.id}/modules/total-modules`),
      },
      {
        path: "courses/:courseId/modules/update/:id",
        element: (
          <PrivateRouteAdmin>
            <AdminModulesUpdate />
          </PrivateRouteAdmin>
        ),
        loader: ({params}) =>
          axios.get(`/admin/courses/${params.courseId}/modules/${params.id}`),
      },
    ],
  },
]);
export default router;
