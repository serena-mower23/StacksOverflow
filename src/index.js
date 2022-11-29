import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import ErrorPage from "./ErrorPage";
import reportWebVitals from "./reportWebVitals";
import Designer from "./Designer";
import Supporter from "./Supporter";
import Admin from "./Admin";
import {CreateDesigner, loader as rootLoader, action as rootAction} from "./Designer";
import { CreateSupporter } from "./Supporter";
import Root from "./Root";
import Project from "./Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "createDesigner",
    element: <CreateDesigner />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
  },
  {
    path: "createSupporter",
    element: <CreateSupporter />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
  },
  {
    path: "designer/:designerID",
    element: <Designer />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "projects/:projectId",
        element: <Project />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "supporter/:supporterID",
    element: <Supporter />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "projects/:projectId",
        element: <Project />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "projects/:projectId",
        element: <Project />,
        errorElement: <ErrorPage />,
      },
    ]
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
