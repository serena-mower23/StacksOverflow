import { Outlet, Link, useLoaderData, useNavigate } from "react-router-dom";
import { listProjects, deleteProject } from "./controller/Controller";
import React from "react";

export default function Admin() {
  const { projects } = useLoaderData();
  const [activeProjects, setActiveProjects] = React.useState("");
  const [inactiveProjects, setInactiveProjects] = React.useState("");
  const [successProjects, setSuccessProjects] = React.useState("");
  const [failedProjects, setFailedProjects] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    loadDataHandler();
  }, []);

  const loadDataHandler = async () => {
    const projects = await listProjects();

    let activeProjects = [];
    let inactiveProjects = [];
    let successProjects = [];
    let failedProjects = [];

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].Status === "Active") {
        activeProjects.push(projects[i]);
      } else if (projects[i].Status === "Inactive") {
        inactiveProjects.push(projects[i]);
      } else if (projects[i].Status === "Succeeded") {
        successProjects.push(projects[i]);
      } else if (projects[i].Status === "Failed") {
        failedProjects.push(projects[i]);
      }
    }
    setActiveProjects(activeProjects);
    setInactiveProjects(inactiveProjects);
    setSuccessProjects(successProjects);
    setFailedProjects(failedProjects);
  };

  const deleteProjectHandler = async (projectID) => {
    const response = await deleteProject(projectID);

    if (response) {
      refreshPage();
    }
  };

  const refreshPage = () => {
    navigate(0);
  };

  const logoutHandler = async () => {
    navigate("/");
  };

  const reapProjectHandler = async () => {};

  return (
    <div className="container">
      <div className="container d-flex flex-column mt-2 align-items-center">
        <nav className="navbar navbar-expand-lg">
          <label className="m-2 h1">&#128184; $tacksOverflow &#128184;</label>
          <button className="btn btn-primary" onClick={(e) => logoutHandler()}>
            Log out of Admin
          </button>
        </nav>
      </div>
      <div className="row">
        <div className="col-3">
          <h2>List of Active Projects</h2>
          {activeProjects.length ? (
            <ul>
              {activeProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link to={`projects?projectID=${project.ProjectID}`}>
                    <p>{project.ProjectName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Active Projects</i>
            </p>
          )}
          <h2>List of Inactive Projects</h2>
          {inactiveProjects.length ? (
            <ul>
              {inactiveProjects.map((project) => (
                <li key={project.ProjectID}>
                  <div className="container-fluid">
                    <Link to={`projects?projectID=${project.ProjectID}`}>
                      <p>{project.ProjectName}</p>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => deleteProjectHandler(project.ProjectID)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Inactive Projects</i>
            </p>
          )}
        </div>
        <div className="col-3">
          <h2>List of Successful Projects</h2>
          {successProjects.length ? (
            <ul>
              {successProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link to={`projects?projectID=${project.ProjectID}`}>
                    <p>{project.ProjectName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Successful Projects</i>
            </p>
          )}
          <h2>List of Failed Projects</h2>
          {failedProjects.length ? (
            <ul>
              {failedProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link to={`projects?projectID=${project.ProjectID}`}>
                    <p>{project.ProjectName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Failed Projects</i>
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          className="btn btn-warning"
          onClick={() => reapProjectHandler()}
        >
          Reap Projects
        </button>
      </div>
    </div>
  );
}
