import React from "react";
import { useLoaderData, Outlet, Link, useNavigate } from "react-router-dom";
import {
  viewTransactions,
  viewTemplates,
  updateFunds,
  getFunds,
  viewProject,
} from "./controller/Controller";

export default function ProjectSupporter() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const supporterID = params.get("supporterID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const [claims, setClaims] = React.useState("");
  const [directSupport, setDirectSupportAmount] = React.useState("");
  const [transactions, setTransactions] = React.useState("");
  const [funds, setFunds] = React.useState("");
  const [fundAmount, setFundAmount] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    grabPledgeTemplates();
    grabProjectTransactions();
    // loadFundsHandler();
  }, []);

  const logoutHandler = async () => {
    navigate("/");
  };

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

  const grabPledgeTemplates = async () => {
    const response = await viewTemplates(projectID);
    if (response.length < 0) {
      let pledge = [];
      setPledges(pledge);
    } else {
      setPledges(response);
    }
  };

  const grabProjectTransactions = async () => {
    const response = await viewTransactions(projectID);
    setTransactions(response);
    loadDataHandler();
  };

  const refreshPage = () => {
    navigate(0);
  };

  const addFunds = async () => {
    const response = await updateFunds(supporterID, fundAmount);
    setFunds(response.funds);
  };

  const loadFundsHandler = async () => {
    const response = await getFunds(supporterID);

    setFunds(response.funds);
  };

  const claimPledge = async (templateID, pledgeAmount) => {
    if (pledgeAmount > funds) {
      alert("You do not have enough funds to claim the pledge.");
    } else {
      const response = await claimPledge(supporterID, templateID);
      if (response) {
        refreshPage();
      }
    }
  };

  const dashboardHandler = async () => {
    navigate(-1);
  };

  const directSupportHandler = async () => {
    if (directSupport > funds) {
      alert("You do not have enough funds to make that direct support.");
    } else {
      const response = await claimPledge(supporterID, "N/A");
      if (response) {
        refreshPage();
      }
    }
  };

  return (
    <>
      <div className="mt-2">
        <nav className="navbar navbar-expand-lg">
          <div className="container align-items-center">
            <div className="row">
              <div className="col">
                <label>Funds: ${funds}</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  onChange={(e) => setFundAmount(e.target.value)}
                />
                <button className="btn btn-primary" onClick={(e) => addFunds()}>
                  &#128176; Add Funds
                </button>
              </div>
              <div className="col">
                <label className="m-2 h1">
                  &#128184; $tacksOverflow &#128184;
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
        <button className="btn btn-primary" onClick={(e) => dashboardHandler()}>
          Close Project
        </button>
        <h1>{project.ProjectName}</h1>
        <p>Project Type: {project.ProjectType}</p>
        <p>Project Story: {project.ProjectStory}</p>
        <p>Project Goal: {project.ProjectGoal}</p>
        <p>Money Raised: {project.MoneyRaised}</p>
        <p>Number of Supporters: {project.NumSupporter}</p>
        <p>Project Deadline: {project.Deadline}</p>
        <h4>Pledges</h4>
        <div>
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
                    <button
                      className="btn btn-primary"
                      onClick={(e) =>
                        claimPledge(pledge.TemplateID, pledge.PledgeAmount)
                      }
                    >
                      Claim Pledge
                    </button>
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
        <div>
          <h4>Make a Direct Support</h4>
          <input
            type="text"
            onChange={(e) => setDirectSupportAmount(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={(e) => directSupportHandler()}
          >
            &#128176; Direct Support
          </button>
        </div>
        <div>
          <h4>Claimed Pledges</h4>
          {claims.length ? (
            <ul>
              {claims.map((claim) => (
                <li>
                  <p>Pledge #{claim.TemplateID}</p>
                  <p>Pledge Amount: {claim.PledgeAmount}</p>
                  <p>Pledge Reward: {claim.Reward}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Claimed Pledges</i>
            </p>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
