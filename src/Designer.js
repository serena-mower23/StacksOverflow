import { Outlet, Link, useLoaderData, useNavigate } from "react-router-dom";
import { listDesignerProjects, createProject } from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";

export async function action(
  inputName,
  inputType,
  inputStory,
  inputGoal,
  inputDeadline,
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
}

export async function loader() {
  const params = new URLSearchParams(window.location.search);
  const designerID = params.get("designerID");
  const projects = await listDesignerProjects(designerID);
  return { projects };
}

export default function Designer() {
  const params = new URLSearchParams(window.location.search);
  const designerID = params.get("designerID");
  const [inputName, setInputName] = React.useState("");
  const [inputType, setInputType] = React.useState("");
  const [inputStory, setInputStory] = React.useState("");
  const [inputGoal, setInputGoal] = React.useState("");
  const [inputDeadline, setInputDeadline] = React.useState("");
  const navigate = useNavigate();

  const { projects } = useLoaderData();

  const activeProjects = [];
  const inactiveProjects = [];

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].isLaunched === 1) {
      activeProjects.push(projects[i]);
    } else {
      inactiveProjects.push(projects[i]);
    }
  }
  return (
    <>
      <div id="sidebar">
        <h2>$tacksOverflow</h2>
        <h2>List of Active Projects</h2>
        {activeProjects.length ? (
          <ul>
            {activeProjects.map((project) => (
              <li key={project.ProjectID}>
                <button
                  onClick={(e) => {
                    navigate(
                      `projects?projectID=${project.ProjectID}&designerID=${designerID}`
                    );
                  }}
                >
                  {project.ProjectName}
                </button>
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
                <button
                  onClick={(e) => {
                    navigate(
                      `projects?projectID=${project.ProjectID}&designerID=${designerID}`
                    );
                  }}
                >
                  {project.ProjectName}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No Projects</i>
          </p>
        )}
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
          <button
            onClick={(e) =>
              action(
                inputName,
                inputType,
                inputStory,
                inputGoal,
                inputDeadline,
                designerID
              )
            }
          >
            Create Project
          </button>
        </div>
      </div>
    </>
  );
}
