import React from "react";
import { viewProject } from "./controller/Controller";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { viewTransactions, viewTemplates, deletePledge } from "./controller/Controller";

export default function ProjectDesigner() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const designerID = params.get("designerID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const [transactions, setTransactions] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    grabPledgeTemplates();
    grabTransactions();
  }, []);

  const loadDataHandler = async () => {
    const response = await viewProject(projectID);
    const project = response[0];
    let moneyRaised = 0;
    for (var i = 0; i < transactions.length; i++) {
      let amount = transactions[i].Amount;
      moneyRaised += amount;
    }
    project["MoneyRaised"] = moneyRaised;
    setProject(project);
  };

  const refreshPage = () => {
    navigate(0);
  };

  const grabPledgeTemplates = async () => {
    const response = await viewTemplates(projectID);
    if (response.length < 0) {
      let pledge = [];
      setPledges(pledge);
    } else {
      setPledges(response);
    }
  };

  const grabTransactions = async () => {
    const response = await viewTransactions(projectID);
    setTransactions(response);
    loadDataHandler();
  };

  const dashboardHandler = async () => {
    navigate(-1);
  };

  const deletePledgeHandler = async (templateID) => {
    const response = await deletePledge(templateID);

    if (response) {
      refreshPage();
    }
  }

  return (
    <>
      <div>
        <button onClick={(e) => dashboardHandler()} className="btn btn-primary">Close Project</button>
        <h1>{project.ProjectName}</h1>
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
                  {pledge.MaxSupporters !== 0 ? (
                    <p>Max Supporters: {pledge.MaxSupporters}</p>
                  ) : (
                    <p>Max Supporters: No Limit</p>
                  )}
                  <p>Pledge Amount: {pledge.PledgeAmount}</p>
                  <p>Pledge Reward: {pledge.Reward}</p>
                  {project.IsLaunched === 0 ? (
                  <button className="btn btn-sm btn-danger" onClick={(e) => deletePledgeHandler(pledge.TemplateID)}>Delete</button>
                  ) : (<p></p>)}
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
      {project.IsLaunched === 0 ? (
              <div>
              <Link
                to={`/createPledge?projectID=${[projectID]}&designerID=${designerID}`}
              >
                <button className="btn btn-primary">Create New Pledge</button>
              </Link>
            </div>
      ) : (<p></p>)}
      <Outlet />
    </>
  );
}
