import React from "react";
import { viewProject } from "./controller/Controller";
import { useLoaderData, Outlet, Link } from "react-router-dom";

export async function loader() {
  console.log("hello?");
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const response = await viewProject(projectID);
  const project = response[0];
  return { project };
}

export default async function Project() {
  const { project } = await useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>{project.ProjectName}</h1>
        <p>{project.ProjectType}</p>
        <p>{project.ProjectStory}</p>
        <p>{project.ProjectGoal}</p>
        <p>{project.MoneyRaised}</p>
        <p>{project.NumSupporter}</p>
        <p>{project.Deadline}</p>
      </div>
      <div id="details">
        <Link to={`/createPledge`}>
          <p>Create New Pledge</p>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
