import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import ErrorPage from "./ErrorPage";
import reportWebVitals from "./reportWebVitals";
import Designer from "./Designer";
import Supporter from "./Supporter";
import Admin, { loader as adminLoader } from "./Admin";
import CreateDesigner from "./CreateDesigner";
import CreateSupporter from "./CreateSupporter";
import { loader as designerLoader, action as createAction } from "./Designer";
import Pledge, { action as createPledgeAction } from "./Pledge";
import Root from "./Root";
import ProjectDesigner, { loader as projectLoader } from "./ProjectDesigner";
import ProjectSupporter from "./ProjectSupporter";
import ProjectAdmin from "./ProjectAdmin";

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
  },
  {
    path: "admin/projects",
    element: <ProjectAdmin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "designer",
    element: <Designer />,
    errorElement: <ErrorPage />,
    action: createAction,
  },
  {
    path: "designer/projects",
    element: <ProjectDesigner />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "createPledge",
        element: <Pledge />,
        errorElement: <ErrorPage />,
        action: createPledgeAction,
      },
    ],
  },
  {
    path: "createPledge",
    element: <Pledge />,
    errorElement: <ErrorPage />,
    action: createPledgeAction,
  },
  {
    path: "supporter",
    element: <Supporter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects",
        element: <ProjectSupporter />,
        errorElement: <ErrorPage />,
      },
    ],
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
