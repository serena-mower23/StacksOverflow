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
    grabProjectInformation();
    getDesignerName();
  }, []);

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

  const grabProjectInformation = async () => {
    const response = await viewProject(projectID);
    const project = await response[0];
    setProject(project);
  };

  const getDesignerName = async () => {
    const response = await getDesignerInfo(designerID);
    setDesignerName(response);
  };

  const grabTransactions = async () => {
    const response = await viewTransactions(projectID);
    let supporters = [];
    for (let i = 0; i < response.length; i++) {
      const supporter = await getSupporterInfo(response[i].SupporterID);
      const info = {
        supporterName: supporter[0].Name,
        amount: response[i].Amount,
      };
      supporters.push(info);
    }
    setTransactions(supporters);
  };

  const dashboardHandler = async () => {
    navigate(-1);
  };

  const logoutHandler = async () => {
    navigate("/");
  };

  const deletePledgeHandler = async (templateID) => {
    const response = await deletePledge(templateID);

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
              className="nav-link btn btn-link"
              onClick={(e) => logoutHandler()}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
      <button
            onClick={(e) => dashboardHandler()}
            className="btn btn-primary"
          >
            Close Project
          </button>
      <div className="row">
        <div className="col-4">

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
        <div className="col">
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
            <div>
              <h3>Project Supporters</h3>
              <ul>
                {transactions.length ? (
                  <ul>
                    {transactions.map((transaction) => (
                      <li>
                        <p>Supporter Name: {transaction.supporterName}</p>
                        <p>Amount Supported: {transaction.amount}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    <i>No supporters yet</i>
                  </p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
