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

  const { projects } = useLoaderData();
  const [model, setModel] = React.useState(new Model("Admin", projects));
  const [redraw, forceRedraw] = React.useState(0);

  const appRef = React.useRef(null); // Later need to be able to refer to App

  React.useEffect(() => {
      redrawCanvas(model, appRef.current);
  }, [model, redraw]);

  return (
    <>
    <h2>$tacksOverflow</h2>
        <div id="sidebar">
        <h2>List of Projects</h2>
        <p>Click to View Project</p>
        {model.model.projects.length ? (
            <ul>
              {model.model.projects.map((project) => (
                <li key={project.projectID}>
                  <Link to={`projects?projectID=${project.projectID}`}>
                      <p>
                        {project.projectName}
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