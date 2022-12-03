import { Outlet, Link, useLoaderData, useNavigate } from "react-router-dom";
import { listProjects } from "./controller/Controller";
import React from "react";

export async function loader() {
  const projects = await listProjects();
  return { projects };
}

export default function Admin() {
  const { projects } = useLoaderData();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="container d-flex flex-column mt-2 align-items-center">
        <nav className="navbar navbar-expand-lg">
          <label className="m-2 h1">&#128184; $tacksOverflow &#128184;</label>
          <button
            className="nav-link btn btn-link"
            onClick={(e) => logoutHandler()}
          >
            Log out
          </button>
        </nav>
      </div>
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
      <div id="detail"></div>
    </div>
  );
}
