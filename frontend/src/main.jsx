import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/router";
import {RouterProvider} from "react-router-dom";
import AuthContext from "./context/AuthContext";
import axios from "axios";
import {HelmetProvider} from "react-helmet-async";

// backend url
axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </HelmetProvider>
  </React.StrictMode>
);
