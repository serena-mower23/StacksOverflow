import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import {listProjects, createProject} from "./controller/Controller";
import Model from "./model/Model";
import React from "react";
import { redrawCanvas } from "./boundary/Boundary.js";

export async function action() {
    await createProject();
  }

export async function loader() {
  const projects = await listProjects();
  console.log("MY DUDE");
  return { projects };
}

export default function Admin() {

  const [model, setModel] = React.useState(new Model("Admin"));
  const [redraw, forceRedraw] = React.useState(0);

  const appRef = React.useRef(null); // Later need to be able to refer to App

  React.useEffect(() => {
      redrawCanvas(model, appRef.current);
  }, [model, redraw]);
  const { projects } = useLoaderData();
  return (
    <>
        <div id="sidebar">
        <h2>List of Projects</h2>
        <p>Click to View Project</p>
        {projects.length ? (
            <ul>
              {projects.map((project) => (
                <li key={project.ProjectID}>
                  <Link to={`projects/${project.ProjectID}`}>
                      <p>
                        {project.ProjectName}
                      </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No projects</i>
            </p>
          )}
        </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}