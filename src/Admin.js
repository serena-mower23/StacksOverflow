import { Outlet, Link, useLoaderData } from "react-router-dom";
import { listProjects } from "./controller/Controller";
import React from "react";
import NavBar from "./NavBar";

export async function loader() {
  const projects = await listProjects();
  return { projects };
}

export default function Admin() {
  const { projects } = useLoaderData();

  return (
    <div className="container">
      <NavBar />
      <div id="sidebar">
        <h2>List of Projects</h2>
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
    </div>
  );
}
