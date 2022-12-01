import { Outlet, Link, useLoaderData, useNavigate } from "react-router-dom";
import { listDesignerProjects, createProject } from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";
import NavBar from "./NavBar";

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
    alert("Hey dumb bitch");
  }
  return result;
}
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
  const navigate = useNavigate();

  React.useEffect(() => {
    loadDataHandler();
  }, []);

  const loadDataHandler = async () => {
    const projects = await listDesignerProjects(designerID);
    console.log(projects);

    const activeProjects = [];
    const inactiveProjects = [];

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].IsLaunched === 1) {
        activeProjects.push(projects[i]);
      } else {
        inactiveProjects.push(projects[i]);
      }
    }
    setActiveProjects(activeProjects);
    setInactiveProjects(inactiveProjects);
  };

  const refreshPage = () => {
    navigate(0);
  };

  const createProjectHandler = async () => {
    const result = await action(
      inputName,
      inputType,
      inputStory,
      inputGoal,
      inputDeadline,
      designerID
    );

    if (result) {
      refreshPage();
    }
  };

  return (
    <div>
      <NavBar />
      <div>
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
            <i>No Projects</i>
          </p>
        )}
        <h2>List of Inactive Projects</h2>
        {inactiveProjects.length ? (
          <ul>
            {inactiveProjects.map((project) => (
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
            <i>No Projects</i>
          </p>
        )}
      </div>
      <div>
        <Outlet />
      </div>
      <div id="detail">
        <p>Project Name:</p>
        <input
          type="text"
          onChange={(e) => setInputName(e.target.value)}
        ></input>
        <p>Project Type:</p>
        <input
          type="text"
          onChange={(e) => setInputType(e.target.value)}
        ></input>
        <p>Project Story:</p>
        <input
          type="text"
          onChange={(e) => setInputStory(e.target.value)}
        ></input>
        <p>Project Goal:</p>
        <input
          type="text"
          onChange={(e) => setInputGoal(e.target.value)}
        ></input>
        <p>Deadline:</p>
        <input
          type="text"
          onChange={(e) => setInputDeadline(e.target.value)}
        ></input>
        <div>
          <button onClick={(e) => createProjectHandler()}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
