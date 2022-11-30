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
  return { projects };
}

export default function Supporter() {
  const params = new URLSearchParams(window.location.search);

  const supporterID = params.get("id");

  const [model, setModel] = React.useState(new Model("Supporter", supporterID));
  const [redraw, forceRedraw] = React.useState(0);

  const appRef = React.useRef(null); // Later need to be able to refer to App

  React.useEffect(() => {
      redrawCanvas(model, appRef.current);
  }, [model, redraw]);

  const { projects } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <nav>
        {projects.length ? (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <Link to={`projects/${project.id}`}>
                      <p>
                        {project.projectName} {project.projectDesigner}
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
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export function CreateSupporter() {
    return (
        <>
        <h2>$tacksOverflow</h2>
        <Form method="post">
            <p>Email:</p>
            <input type="text"></input>
            <p>Password:</p>
            <input type="text"></input>
            <p>Name:</p>
            <input type="text"></input>
            <div>
            <button type="submit">Create Supporter</button>
            </div>
        </Form>
        </>
    )
}