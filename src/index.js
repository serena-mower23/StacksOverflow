import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import ErrorPage from "./ErrorPage";
import reportWebVitals from "./reportWebVitals";
import Designer from "./Designer";
import Supporter from "./Supporter";
import Admin, {loader as adminLoader} from "./Admin";
import {CreateDesigner, loader as designerLoader, action as createAction} from "./Designer";
import { CreateSupporter } from "./Supporter";
import Root from "./Root";
import Project, {loader as projectLoader} from "./Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
    children: [
      {
        path: "projects",
        element: <Project />,
        errorElement: <ErrorPage />,
        loader: projectLoader
      },
    ]
  },
  {
    path: "designer",
    element: <Designer />,
    errorElement: <ErrorPage />,
    loader: designerLoader,
    action: createAction,
    children: [
      {
        path: "projects",
        element: <Project />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "supporter",
    element: <Supporter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects",
        element: <Project />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "createDesigner",
    element: <CreateDesigner />,
    errorElement: <ErrorPage />,
  },
  {
    path: "createSupporter",
    element: <CreateSupporter />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
