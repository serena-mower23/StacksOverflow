import React from "react";
import { viewProject } from "./controller/Controller";
import { useLoaderData, Outlet, Link, useNavigate } from "react-router-dom";

export async function loader() {
  console.log("hello?");
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const response = await viewProject(projectID);
  const project = response[0];
  return { project };
}

export default function Project() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const designerID = params.get("designerID");
  const { project } = useLoaderData();
  const navigate = useNavigate();

  const dashboardHandler = async () => {
    navigate(-1);
  };

  return (
    <>
      <div>
      <button onClick={(e) => dashboardHandler()}>
        Back to Designer Dashboard
      </button>
        <h1>{project.ProjectName}</h1>
        <p>{project.ProjectType}</p>
        <p>{project.ProjectStory}</p>
        <p>{project.ProjectGoal}</p>
        <p>{project.MoneyRaised}</p>
        <p>{project.NumSupporter}</p>
        <p>{project.Deadline}</p>
      </div>
      <div id="details">
        <Link to={`/createPledge?projectID=${[projectID]}&designerID=${designerID}`}>
          <p>Create New Pledge</p>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
