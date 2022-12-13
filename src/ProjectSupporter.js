import React from "react";
import { useNavigate } from "react-router-dom";
import {
  viewTemplates,
  updateFunds,
  viewProject,
  viewSupporterTransactions,
  createTransaction,
  viewSupporterTemplate,
  getDesignerInfo,
  getSupporterInfo,
} from "./controller/Controller";

export default function ProjectSupporter() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const supporterID = params.get("supporterID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const [designerName, setDesignerName] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [claims, setClaims] = React.useState("");
  const [directSupport, setDS] = React.useState("");
  const [directSupportAmount, setDirectSupportAmount] = React.useState("");
  const [funds, setFunds] = React.useState("");
  const [fundAmount, setFundAmount] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    grabPledgeTemplates();
    grabProjectInformation();
    grabClaimedPledges();
  }, []);

  const logoutHandler = async () => {
    navigate("/");
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

  const grabProjectInformation = async () => {
    const response = await viewProject(projectID);
    const project = await response[0];
    const currentDate = project.Deadline;
    const newDate =
      currentDate.substring(0, 12) + "6" + currentDate.substring(13);
    const date = new Date(newDate);
    project["Deadline"] = date;
    setProject(project);
    const response2 = await getDesignerInfo(project.DesignerID);
    let name = response2[0].Name;
    setDesignerName(name);
    const response3 = await getSupporterInfo(supporterID);
    setFunds(response3[0].Funds);
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
      const response2 = await getSupporterInfo(supporterID);
      setFunds(response2[0].Funds);
      refreshPage();
    }
  };

  function checkNumSupporters(templateID) {
    let result = true;
    for (let i = 0; i < pledges.length; i++) {
      if (pledges[i].TemplateID === templateID) {
        if (
          pledges[i].MaxSupporters !== 0 &&
          pledges[i].NumSupporters >= pledges[i].MaxSupporters
        ) {
          result = false;
        }
      }
    }
    return result;
  }

  const createTransactionHandler = async () => {
    const result = checkNumSupporters(selected.templateID);
    if (selected.pledgeAmount > funds) {
      alert("You do not have enough funds to claim the pledge(s).");
    } else if (!result) {
      alert("The max number of supporters has already been reached.");
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
    <div>
      <nav className="navbar navbar-expand-lg mt-2">
        <div className="container align-items-center">
          <div className="col-2">
            <label>Funds: ${funds}</label>
          </div>
          <div className="col-5">
            <input
              type="text"
              onChange={(e) => setFundAmount(e.target.value)}
            />
            <button className="btn btn-primary" onClick={(e) => addFunds()}>
              &#128176; Add Funds
            </button>
          </div>
          <div className="col-6">
            <label className="m-2 h1">&#128184; $tacksOverflow &#128184;</label>
          </div>
          <div className="col-3">
            <button
              className="btn btn-primary"
              onClick={(e) => logoutHandler()}
            >
              Log out of @{supporterID}
            </button>
          </div>
        </div>
      </nav>
      <div className="container align-items-center">
        <button className="btn btn-primary mb-3 mt-3" onClick={(e) => dashboardHandler()}>
          Close Project
        </button>
        <div className="row">
          <div className="col">
            <h1>{project.ProjectName}</h1>
            <p>Project Designer: {designerName}</p>
            <p>Project Type: {project.ProjectType}</p>
            <p>Project Story: {project.ProjectStory}</p>
            <p>
              Money Raised: ${project.MoneyRaised}/${project.ProjectGoal}
            </p>
            <p>Project Status: {project.Status}</p>
            <p>Number of Supporters: {project.NumSupporters}</p>
            <p>
              Project Deadline:{" "}
              {new Date(project.Deadline).toLocaleDateString()}
            </p>
          </div>
          <div className="col">
            <h2>Pledges</h2>
            <h5>
              <i>Please choose only one.</i>
            </h5>
            <ul>
              {pledges.length ? (
                <ul>
                  {pledges.map((pledge) => (
                    <li key={pledge.TemplateID}>
                      {pledge.MaxSupporters !== 0 ? (
                        <p>
                          Supporters: {pledge.NumSupporters} /{" "}
                          {pledge.MaxSupporters}
                        </p>
                      ) : (
                        <p>Supporters: {pledge.NumSupporters} / No Limit</p>
                      )}
                      <p>Pledge Amount: ${pledge.PledgeAmount}</p>
                      <p>Pledge Reward: {pledge.Reward}</p>
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
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
            <button
              className="btn btn-primary"
              onClick={() => createTransactionHandler()}
            >
              Claim Pledge
            </button>
          </div>
          <div className="col">
            <h4>Direct Support</h4>
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
          <div className="col">
            <h4>Claimed Pledges</h4>
            {claims.length ? (
              <ul>
                {claims.map((claim) => (
                  <li key={claim.TemplateID}>
                    <p>Pledge Amount: ${claim.Amount}</p>
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
          <div className="col-3">
            <h4>Direct Support Amount</h4>
            {directSupport > 0 ? (
              <p>
                You have directly supported ${directSupport} to this project.
              </p>
            ) : (
              <p>
                <i>You haven't directly supported this project.</i>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
