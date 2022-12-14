import { Link, useNavigate } from "react-router-dom";
import {
  listDesignerProjects,
  createProject,
  deleteProject,
  launchProject,
} from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";

export default function Designer() {
  const params = new URLSearchParams(window.location.search);
  const designerID = params.get("designerID");

  const [inputName, setInputName] = React.useState("");
  const [inputType, setInputType] = React.useState("");
  const [inputStory, setInputStory] = React.useState("");
  const [inputGoal, setInputGoal] = React.useState("");
  const [inputDeadline, setInputDeadline] = React.useState("");
  const [activeProjects, setActiveProjects] = React.useState("");
  const [inactiveProjects, setInactiveProjects] = React.useState("");
  const [successProjects, setSuccessProjects] = React.useState("");
  const [failedProjects, setFailedProjects] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    loadDataHandler();
  }, []);

  const loadDataHandler = async () => {
    const projects = await listDesignerProjects(designerID);

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

  const refreshPage = () => {
    navigate(0);
  };

  const logoutHandler = async () => {
    navigate("/");
  };

  const createProjectHandler = async () => {
    let response;
    if (
      inputName &&
      inputType &&
      inputStory &&
      inputGoal &&
      inputDeadline &&
      designerID
    ) {
      response = await createProject(
        inputName,
        inputType,
        inputStory,
        inputGoal,
        inputDeadline,
        designerID
      );
    } else {
      alert("Please fill out all of the fields.");
    }
    if (response === "true") {
      refreshPage();
    }
  };

  const deleteProjectHandler = async (projectID) => {
    const response = await deleteProject(projectID);

    if (response === "true") {
      refreshPage();
    }
  };

  const launchProjectHandler = async (projectID) => {
    const response = await launchProject(projectID);

    if (response === "true") {
      refreshPage();
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg mt-2">
        <div className="container align-items-center">
          <img src="stacks.png" width="100" />
          <div className="col-11">
            <label className="m-2 h1">&#128184; $tacksOverflow &#128184;</label>
          </div>
          <div className="col-3">
            <button
              className="btn btn-primary"
              onClick={(e) => logoutHandler()}
            >
              Log out of @{designerID}
            </button>
          </div>
        </div>
      </nav>
      <div className="row mt-5">
        <div className="col text-center">
          <p className="mb-1">Project Name:</p>
          <input
            type="text"
            onChange={(e) => setInputName(e.target.value)}
            className="m-1"
          />
        </div>
        <div className="col text-center">
          <p className="m-1">Project Genre:</p>
          <input type="text" onChange={(e) => setInputType(e.target.value)} />
        </div>
        <div className="col text-center">
          <p className="m-1">Project Story:</p>
          <input
            type="text"
            onChange={(e) => setInputStory(e.target.value)}
            className="m-1"
          />
        </div>
        <div className="col text-center">
          <p className="m-1">Project Goal:</p>
          <input
            type="text"
            onChange={(e) => setInputGoal(e.target.value)}
            className="m-1"
          />
        </div>
        <div className="col text-center">
          <p className="m-1">Deadline: (yyyy/mm/dd)</p>
          <input
            type="text"
            onChange={(e) => setInputDeadline(e.target.value)}
            className="m-1"
          />
        </div>
        <div className="col text-center">
          <button
            className="btn btn-primary"
            onClick={(e) => createProjectHandler()}
          >
            Create Project
          </button>
        </div>
      </div>
      <div className="container d-flex flex-column align-items-center">
        <div className="row mt-5">
          <div className="col">
            <p>
              Inactive: {inactiveProjects.length} / Active:{" "}
              {activeProjects.length} / Succeeded: {successProjects.length} /
              Failed: {failedProjects.length}
            </p>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-3">
          <h2>Inactive Projects</h2>
          {inactiveProjects.length ? (
            <ul>
              {inactiveProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link
                    to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                  >
                    <p>{project.ProjectName}</p>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => deleteProjectHandler(project.ProjectID)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={(e) => launchProjectHandler(project.ProjectID)}
                  >
                    Launch
                  </button>
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
          <h2>Active Projects</h2>
          {activeProjects.length ? (
            <ul>
              {activeProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link
                    to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                  >
                    <p>{project.ProjectName}</p>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => deleteProjectHandler(project.ProjectID)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Active Projects</i>
            </p>
          )}
        </div>
        <div className="col-3">
          <h2>Successful Projects</h2>
          {successProjects.length ? (
            <ul>
              {successProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link
                    to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                  >
                    <p>{project.ProjectName}</p>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => deleteProjectHandler(project.ProjectID)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Successful Projects</i>
            </p>
          )}
        </div>
        <div className="col-3">
          <h2>Failed Projects</h2>
          {failedProjects.length ? (
            <ul>
              {failedProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link
                    to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                  >
                    <p>{project.ProjectName}</p>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => deleteProjectHandler(project.ProjectID)}
                  >
                    Delete
                  </button>
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
    </div>
  );
}
