import React from "react";
import {viewProject} from "./controller/Controller";
import { useLoaderData } from "react-router-dom";



export async function loader() {
  console.log("hello?");
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const project = await viewProject(projectID);
  console.log("MY DUDE 2.0");
  return { project };
}

export default function Project() {
  const { project } = useLoaderData();
  console.log("FLORENCE PUGH");
  console.log(project);
  return (
    <div id="project">
        <h1>
          {project.projectName}
        </h1>
        <p>
          {project.projectDesigner}
        </p>
        <p>
          {project.reward}
        </p>
    </div>
  );
  }