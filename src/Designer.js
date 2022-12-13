import { Link, useNavigate } from "react-router-dom";
import {
  listDesignerProjects,
  createProject,
  deleteProject,
  launchProject,
} from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";
import Select from "react-select";

export async function action(
  inputName,
  inputType,
  inputStory,
  inputGoal,
  inputDeadline,
  designerID
) {
  let result = false;
  if (
    inputName &&
    inputType &&
    inputStory &&
    inputGoal &&
    inputDeadline &&
    designerID
  ) {
    await createProject(
      inputName,
      inputType,
      inputStory,
      inputGoal,
      inputDeadline,
      designerID
    );
    result = true;
  } else {
    alert("Please fill out all of the fields.");
  }
  return result;
}

export default function Designer() {
  const params = new URLSearchParams(window.location.search);
  const designerID = params.get("designerID");

  const genres = [
    { value: "Art", label: "Art" },
    { value: "Education", label: "Education" },
    { value: "Fashion", label: "Fashion" },
    { value: "Food", label: "Food" },
    { value: "Game", label: "Game" },
    { value: "Movie", label: "Movie" },
    { value: "Music", label: "Music" },
    { value: "Toy", label: "Toy" },
    { value: "Techology", label: "Technology" },
    { value: "Other", label: "Other" },
  ];

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

  function checkDate(date) {
    const today = new Date();
    const newDate = new Date(date);

    let result;
    if (newDate > today) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  const createProjectHandler = async () => {
    // const check = checkDate(inputDeadline);
    const check = true;
    if (check) {
      const result = await action(
        inputName,
        inputType,
        inputStory,
        inputGoal,
        new Date(inputDeadline),
        designerID
      );
      if (result) {
        refreshPage();
      }
    } else {
      alert("The deadline is before today.");
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
      <div className="row">
        <div className="col-3">
          <h2>List of Active Projects</h2>
          {activeProjects.length ? (
            <ul>
              {activeProjects.map((project) => (
                <li key={project.ProjectID}>
                  <Link
                    to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                  >
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
                    <Link
                      to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                    >
                      <p>{project.ProjectName}</p>
                    </Link>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={(e) => launchProjectHandler(project.ProjectID)}
                    >
                      Launch
                    </button>
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
                  <Link
                    to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                  >
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
                  <Link
                    to={`projects?projectID=${project.ProjectID}&designerID=${designerID}`}
                  >
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
        <div className="col-4 text-center">
          <p className="mb-1">Project Name:</p>
          <input
            type="text"
            onChange={(e) => setInputName(e.target.value)}
            className="m-1"
          ></input>
          <p className="m-1">Project Genre:</p>
          <Select
            options={genres}
            isSearchable={false}
            onChange={(e) => setInputType(e.value)}
          />
          <p className="m-1">Project Story:</p>
          <input
            type="text"
            onChange={(e) => setInputStory(e.target.value)}
            className="m-1"
          ></input>
          <p className="m-1">Project Goal:</p>
          <input
            type="text"
            onChange={(e) => setInputGoal(e.target.value)}
            className="m-1"
          ></input>
          <p className="m-1">Deadline:</p>
          <p>(yyyy/mm/dd)</p>
          <input
            type="text"
            onChange={(e) => setInputDeadline(e.target.value)}
            className="m-1"
          ></input>
          <div className="m-1">
            <button
              className="btn btn-primary"
              onClick={(e) => createProjectHandler()}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
