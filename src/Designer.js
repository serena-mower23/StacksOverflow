import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import {listDProjects, createProject} from "./controller/Controller";
import Model from "./model/Model";
import React from "react";
import { redrawCanvas } from "./boundary/Boundary.js";
import 'url-search-params-polyfill';

export async function action(inputName, inputType, inputStory, inputGoal, inputDeadline, designerID) {
    await createProject(inputName, inputType, inputStory, inputGoal, inputDeadline, designerID);
  }

export async function loader() {
    const params = new URLSearchParams(window.location.search);
    const designerID = params.get("designerID");
    const projects = await listDProjects(designerID);
    // const projects = [];
    return { projects };
}

export default function Designer() {    
    const params = new URLSearchParams(window.location.search);
    const designerID = params.get("designerID");
    const [model, setModel] = React.useState(new Model("Designer", designerID));
    const [redraw, forceRedraw] = React.useState(0);
    const [inputName, setInputName] = React.useState("");
    const [inputType, setInputType] = React.useState("");
    const [inputStory, setInputStory] = React.useState("");
    const [inputGoal, setInputGoal] = React.useState("");
    const [inputDeadline, setInputDeadline] = React.useState("");

    const appRef = React.useRef(null); // Later need to be able to refer to App

    React.useEffect(() => {
        redrawCanvas(model, appRef.current);
    }, [model, redraw]);

  const { projects } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h2>$tacksOverflow</h2>
        {projects.length ? (
            <ul>
            {projects.map((project) => (
                <div>
                    {project.isLaunched ? (
                        <>
                            <h2>List of Active Projects</h2>
                            <li key={project.projectID}>
                            <Link to={`projects?projectID=${project.projectID}`}>
                                <p>
                                    {project.projectName}
                                </p>
                            </Link>
                            </li>
                        </>
                    ) : ( 
                        <>
                            <h2>List of Inactive Projects</h2>
                            <li key={project.projectID}>
                            <Link to={`projects?projectID=${project.projectID}`}>
                                <p>
                                    {project.projectName}
                                </p>
                            </Link>
                            </li>
                        </>
                    )}
                </div>
            ))}
            </ul>
        ) : (
            <p>
              <i>No projects</i>
            </p>
          )}
      </div>
      <Outlet />
      <div id="detail">
        <p>Project Name:</p>
        <input type="text" onChange={(e) => setInputName(e.target.value)}></input>
        <p>Project Type:</p>
        <input type="text" onChange={(e) => setInputType(e.target.value)}></input>
        <p>Project Story:</p>
        <input type="text" onChange={(e) => setInputStory(e.target.value)}></input>
        <p>Project Goal:</p>
        <input type="text" onChange={(e) => setInputGoal(e.target.value)}></input>
        <p>Deadline:</p>
        <input type="text" onChange={(e) => setInputDeadline(e.target.value)}></input>
        <div>
        <button onClick={(e) => action(inputName, inputType, inputStory, inputGoal, inputDeadline, designerID)}>Create Project</button>
        </div>
      </div>
    </>
  );
}

export function CreateDesigner() {
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
            <button type="submit">Create Designer</button>
            </div>
        </Form>
        </>
    )
}