import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import { listProjects, createProject } from "./controller/Controller";
import React from "react";

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

  return (
    <>
      <h2>$tacksOverflow</h2>
      <div id="sidebar">
        <h2>List of Projects</h2>
        <p>Click to View Project</p>
        {projects.length ? (
          <ul>
            {projects.map((project) => (
              <li key={project.ProjectID}>
                <Link to={`projects?projectID=${project.ProjectID}`}>
                  <p>{project.ProjectName}</p>
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
