import React from "react";
import { useLoaderData, Outlet, Link, useNavigate } from "react-router-dom";
import {
  viewTransactions,
  viewTemplates,
  updateFunds,
  getFunds,
  viewProject,
  viewSupporterTransactions,
  createTransaction,
  viewSupporterTemplate,
} from "./controller/Controller";

export default function ProjectSupporter() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const supporterID = params.get("supporterID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [claims, setClaims] = React.useState("");
  const [directSupport, setDS] = React.useState("");
  const [directSupportAmount, setDirectSupportAmount] = React.useState("");
  const [transactions, setTransactions] = React.useState("");
  const [funds, setFunds] = React.useState("");
  const [fundAmount, setFundAmount] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    loadDataHandler();
    grabPledgeTemplates();
    grabProjectTransactions();
    grabClaimedPledges();
    loadFundsHandler();
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

  const getReward = async (templateID) => {
    const response = await viewSupporterTemplate(templateID);

    let reward = response[0].Reward;
    return reward;
  };

  const grabProjectTransactions = async () => {
    const response = await viewTransactions(projectID);
    setTransactions(response);
    loadDataHandler();
  };

  const grabClaimedPledges = async () => {
    const response = await viewSupporterTransactions(supporterID);
    let currentClaims = [];
    let currentDS = 0;

    for (let i = 0; i < response.length; i++) {
      if (
        response[i].ProjectID === projectID &&
        response[i].TemplateID === "N/A"
      ) {
        currentDS += response[i].Amount;
      } else if (response[i].ProjectID === projectID) {
        const reward = await getReward(response[i].TemplateID);
        response[i]["Reward"] = reward;
        currentClaims.push(response[i]);
      }
    }
    setClaims(currentClaims);
    setDS(currentDS);
  };

  const refreshPage = () => {
    navigate(0);
  };

  const addFunds = async () => {
    const response = await updateFunds(supporterID, fundAmount);
    if (response === "true") {
      const response2 = await getFunds(supporterID);
      setFunds(response2);
      refreshPage();
    }
  };

  const loadFundsHandler = async () => {
    const response = await getFunds(supporterID);
    setFunds(response);
  };

  const createTransactionHandler = async () => {
    if (selected.pledgeAmount > funds) {
      alert("You do not have enough funds to claim the pledge(s).");
    } else {
      const response = await createTransaction(
        projectID,
        selected.templateID,
        supporterID,
        selected.pledgeAmount
      );
      if (response === "true") {
        const newFunds = funds - selected.pledgeAmount;
        setFunds(newFunds);
        refreshPage();
      }
    }
  };

  const directSupportHandler = async () => {
    if (directSupportAmount > funds) {
      alert("You do not have enough funds to support this amount.");
    } else {
      const response = await createTransaction(
        projectID,
        "N/A",
        supporterID,
        directSupportAmount
      );
      if (response === "true") {
        refreshPage();
      }
    }
  };

  const selectedHandler = async (templateID, pledgeAmount) => {
    let newSelected = {
      templateID: templateID,
      pledgeAmount: pledgeAmount,
    };
    setSelected(newSelected);
  };

  const dashboardHandler = async () => {
    navigate(-1);
  };

  return (
    <div className="container">
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
      <div className="container">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={(e) => dashboardHandler()}
            >
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
                        <input
                          class="form-check-input mt-0"
                          type="radio"
                          value=""
                          onChange={() =>
                            selectedHandler(
                              pledge.TemplateID,
                              pledge.PledgeAmount
                            )
                          }
                        />
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
            <button
              className="btn btn-primary"
              onClick={() => createTransactionHandler()}
            >
              Claim Pledge
            </button>
            <div className="col">
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
                      <p>Pledge Amount: {claim.Amount}</p>
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
            <div>
              <h4>Direct Support Amount</h4>
              {directSupport > 0 ? (
                <p>You have directly supported ${directSupport} to this project.</p>
              ) : (
                <p>
                  <i>You haven't directly supported this project.</i>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
