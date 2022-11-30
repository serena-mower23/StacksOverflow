import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import {listProjects, createProject} from "./controller/Controller";
import Model from "./model/Model";
import React from "react";
import { redrawCanvas } from "./boundary/Boundary.js";
import 'url-search-params-polyfill';

export async function action() {
    await createProject();
  }

export async function loader() {
  const projects = await listProjects();
  return { projects };
}


export default function Designer() {
    const params = new URLSearchParams(window.location.search);

    const designerID = params.get("id");
    
    const [model, setModel] = React.useState(new Model("Designer", designerID));
    const [redraw, forceRedraw] = React.useState(0);

    const appRef = React.useRef(null); // Later need to be able to refer to App

    React.useEffect(() => {
        redrawCanvas(model, appRef.current);
    }, [model, redraw]);
      
  const { projects } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        {projects.length ? (
            <ul>
            {projects.map((project) => (
                <div>
                    {project.isLaunched ? (
                        <>
                            <h2>List of Active Projects</h2>
                            <li key={project.projectID}>
                            <Link to={`projects/${project.projectID}`}>
                                <p>
                                    {project.projectName}
                                </p>
                            </Link>
                            </li>
                        </>
                    ) : ( 
                        <>
                            <h2>List of Inactive Projects</h2>
                            <li key={project.projectID}>
                            <Link to={`projects/${project.projectID}`}>
                                <p>
                                    {project.projectName}
                                </p>
                            </Link>
                            </li>
                        </>
                    )}
                </div>
            ))}
            </ul>
        ) : (
            <p>
              <i>No projects</i>
            </p>
          )}
      </div>
      <Outlet />
      <div id="detail">
        <Form method="post">
            <button type="submit">New Project</button>
        </Form>
      </div>
    </>
  );
}

export function CreateDesigner() {
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
            <button type="submit">Create Designer</button>
            </div>
        </Form>
        </>
    )
}