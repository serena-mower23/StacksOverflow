import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import {getProjects, createProject} from "./controller/Controller";

export async function action() {
    await createProject();
  }

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export default function Designer() {
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