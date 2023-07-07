import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/router";
import {RouterProvider} from "react-router-dom";
import AuthContext from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </React.StrictMode>
);
