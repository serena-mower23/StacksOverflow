import React from "react";
import { viewProject } from "./controller/Controller";
import { useLoaderData, Outlet, Link, useNavigate } from "react-router-dom";
import { viewTemplates } from "./controller/Controller";

export default function Project() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const designerID = params.get("designerID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    grabPledgeTemplates();
    loadDataHandler();
  }, []);

  const loadDataHandler = async () => {
    const response = await viewProject(projectID);
    const project = response[0];
    setProject(project);
  };

  const grabPledgeTemplates = async () => {
    console.log("I WANT YOU TO WORK");
    const response = await viewTemplates(projectID);
    console.log("YALL ARE CRAZY");
    console.log(response);
    if (response.length < 0) {
      let pledge = [];
      setPledges(pledge);
    } else {
      setPledges(response);
    }
  };

  const dashboardHandler = async () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <button onClick={(e) => dashboardHandler()}>Close Project</button>
        <h1>Project Name: {project.ProjectName}</h1>
        <p>Project Type: {project.ProjectType}</p>
        <p>Project Story: {project.ProjectStory}</p>
        <p>Project Goal: {project.ProjectGoal}</p>
        <p>Money Raised: {project.MoneyRaised}</p>
        <p>Number of Supporters: {project.NumSupporter}</p>
        <p>Project Deadline: {project.Deadline}</p>
        <h4>Pledges</h4>
        <ul>
          {pledges.length ? (
            <ul>
              {pledges.map((pledge) => (
                <li>
                  <p>Max Supporters: {pledge.MaxSupporters}</p>
                  <p>Pledge Amount: {pledge.PledgeAmount}</p>
                  <p>Pledge Reward: {pledge.Reward}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Pledges</i>
            </p>
          )}
        </ul>
      </div>
    </>
  );
}
