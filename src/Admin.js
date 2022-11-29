import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import {getProjects, createProject} from "./controller/Controller";

export async function action() {
    await createProject();
  }

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export default function Root() {
  const { projects } = useLoaderData();
  return (
    <>
      <h2>List of Projects</h2>
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