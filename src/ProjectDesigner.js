import React from "react";
import { viewProject } from "./controller/Controller";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  viewTransactions,
  viewTemplates,
  deletePledge,
  getDesignerInfo,
  getSupporterInfo,
} from "./controller/Controller";

export default function ProjectDesigner() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const designerID = params.get("designerID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const [designerName, setDesignerName] = React.useState("");
  const [transactions, setTransactions] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    grabPledgeTemplates();
    grabTransactions();
    loadMoneyRaisedHandler();
    // getDesignerName();
  }, []);

  const loadMoneyRaisedHandler = async () => {
    const response = await viewProject(projectID);
    console.log(response);
    const project = await response[0];

    let moneyRaised = 0;
    for (let i = 0; i < transactions.length; i++) {
      let amount = transactions[i].Amount;
      console.log(amount);
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

  const getDesignerName = async () => {
    const response = await getDesignerInfo(project.DesingerID);
    setDesignerName(response);
  };

  const getSupporterName = async () => {
    const response = await getSupporterInfo(project.DesingerID);
  };

  const grabTransactions = async () => {
    const response = await viewTransactions(projectID);
    setTransactions(response);
  };

  const dashboardHandler = async () => {
    navigate(-1);
  };

  const logoutHandler = async () => {
    navigate("/");
  };

  const deletePledgeHandler = async (templateID) => {
    const response = await deletePledge(templateID);

    if (response) {
      refreshPage();
    }
  };

  return (
    <div className="container">
      <div className="mt-2">
        <nav className="navbar navbar-expand-lg">
          <div className="container align-items-center">
            <div className="row">
              <div className="col">
                <label className="m-2 h1">
                  Welcome to &#128184; $tacksOverflow &#128184; {designerName}
                </label>
              </div>
              <div className="col">
                <button
                  className="nav-link btn btn-link"
                  onClick={(e) => logoutHandler()}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <button onClick={(e) => dashboardHandler()} className="btn btn-primary">
          Close Project
        </button>
        <h1>{project.ProjectName}</h1>
        <p>Project Type: {project.ProjectType}</p>
        <p>Project Story: {project.ProjectStory}</p>
        <p>
          Money Raised: ${project.MoneyRaised} / ${project.ProjectGoal}
        </p>
        <p>Number of Supporters: {project.NumSupporters}</p>
        <p>
          Project Deadline: {new Date(project.Deadline).toLocaleDateString()}
        </p>
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
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => deletePledgeHandler(pledge.TemplateID)}
                    >
                      Delete
                    </button>
                  ) : (
                    <p></p>
                  )}
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
            to={`/createPledge?projectID=${[
              projectID,
            ]}&designerID=${designerID}`}
          >
            <button className="btn btn-primary">Create New Pledge</button>
          </Link>
        </div>
      ) : (
        <p></p>
      )}
      <Outlet />
    </div>
  );
}
