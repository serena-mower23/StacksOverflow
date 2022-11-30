import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { listProjects, createProject } from "./controller/Controller";
import React from "react";

export async function action() {
  await createProject();
}

export async function loader() {
  const projects = await listProjects();
  return { projects };
}

export default function Supporter() {
  const params = new URLSearchParams(window.location.search);

  const supporterID = params.get("supporterID");

  const { projects } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h2>$tacksOverflow</h2>
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
