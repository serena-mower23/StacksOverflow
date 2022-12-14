import { Link, useNavigate } from "react-router-dom";
import {
  viewSupporterTransactions,
  updateFunds,
  listProjects,
  getSupporterInfo,
  getSortedProjects,
  viewSupporterTemplate,
  viewProject,
} from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";

export default function Supporter() {
  const params = new URLSearchParams(window.location.search);
  const supporterID = params.get("supporterID");

  const [claims, setClaims] = React.useState("");
  const [directSupports, setDirectSupports] = React.useState("");
  const [successClaims, setSuccessClaims] = React.useState("");
  const [successDirectSupports, setSuccessDirectSupports] = React.useState("");
  const [funds, setFunds] = React.useState("");
  const [fundAmount, setFundAmount] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [projects, setProjects] = React.useState("");
  const [searchedProjects, setSearchedProjects] = React.useState("");
  const [searching, setSearching] = React.useState("");
  const [isSorted, setIsSorted] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    loadFundsHandler();
    loadProjectsHandler();
    loadTransactionsHandler();
  }, []);

  React.useEffect(() => {
    if (isSorted === true) {
      sortProjectsHandler();
    } else {
      loadProjectsHandler();
    }
  }, [isSorted]);

  const getReward = async (templateID) => {
    const response = await viewSupporterTemplate(templateID);

    let reward = response[0].Reward;
    return reward;
  };

  const loadTransactionsHandler = async () => {
    const response = await viewSupporterTransactions(supporterID);
    let claims = [];
    let directSupports = [];

    let activeTransactions = [];
    let successTransactions = [];

    for (let j = 0; j < response.length; j++) {
      const response2 = await viewProject(response[j].ProjectID);
      if (response2[0].Status === "Active") {
        let transaction = response[j];
        transaction["ProjectName"] = response2[0].ProjectName;
        activeTransactions.push(transaction);
      } else if (response2[0].Status === "Succeeded") {
        let transaction = response[j];
        transaction["ProjectName"] = response2[0].ProjectName;
        successTransactions.push(transaction);
      }
    }

    for (let i = 0; i < activeTransactions.length; i++) {
      if (activeTransactions[i].TemplateID === "N/A") {
        directSupports.push(activeTransactions[i]);
      } else {
        const reward = await getReward(activeTransactions[i].TemplateID);
        activeTransactions[i]["Reward"] = reward;
        claims.push(activeTransactions[i]);
      }
    }

    setClaims(claims);
    setDirectSupports(directSupports);

    let successClaims = [];
    let successDS = [];

    for (let i = 0; i < successTransactions.length; i++) {
      if (successTransactions[i].TemplateID === "N/A") {
        successDS.push(successTransactions[i]);
      } else {
        const reward = await getReward(successTransactions[i].TemplateID);
        successTransactions[i]["Reward"] = reward;
        successClaims.push(successTransactions[i]);
      }
    }

    setSuccessClaims(successClaims);
    setSuccessDirectSupports(successDS);
  };

  const loadFundsHandler = async () => {
    const response = await getSupporterInfo(supporterID);
    setFunds(response[0].Funds);
  };

  const loadProjectsHandler = async () => {
    const response = await listProjects();
    let activeProjects = [];
    for (let i = 0; i < response.length; i++) {
      if (response[i].Status === "Active") {
        activeProjects.push(response[i]);
      }
    }
    setProjects(activeProjects);
    return activeProjects;
  };

  const addFunds = async () => {
    const response = await updateFunds(supporterID, fundAmount);
    if (response === "true") {
      const response2 = await getSupporterInfo(supporterID);
      setFunds(response2[0].Funds);
      refreshPage();
    }
  };

  const searchHandler = async () => {
    setSearching(true);
    const currentProjects = await loadProjectsHandler();

    const response = await findProjectsByString(currentProjects);
    setSearchedProjects(response);
  };

  const refreshPage = () => {
    navigate(0);
  };

  const logoutHandler = async () => {
    navigate("/");
  };

  const sortProjectsHandler = async () => {
    const response = await getSortedProjects();
    let activeProjects = [];
    for (let i = 0; i < response.length; i++) {
      if (response[i].Status === "Active") {
        activeProjects.push(response[i]);
      }
    }
    setProjects(activeProjects);
  };

  function findProjectsByString(projects) {
    return projects.filter((obj) => {
      return Object.values(obj).some((val) => {
        const response =
          typeof val === "string" &&
          val.toLowerCase().includes(search.toLowerCase());
        return response;
      });
    });
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg mt-2">
        <img src="stacks.png" width="100" />
        <div className="container align-items-center">
          <div className="col-2">
            <label>Funds: ${funds}</label>
          </div>
          <div className="col-4">
            <input
              type="text"
              onChange={(e) => setFundAmount(e.target.value)}
            />
            <button className="btn btn-primary" onClick={(e) => addFunds()}>
              &#128176; Add Funds
            </button>
          </div>
          <div className="col-5">
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
      <div className="container d-flex flex-column align-items-center">
        <div className="row mt-5 ms-5">
          <div className="col-4">
            <div className="row">
              <div className="col">
                <h2>Search Projects</h2>
                <input
                  type="text"
                  placeholder="Search Projects..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={(e) => searchHandler()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                {searching ? (
                  <>
                    {searchedProjects.length ? (
                      <div className="list-group">
                        {searchedProjects.map((project) => (
                          <Link
                            to={`projects?projectID=${project.ProjectID}&supporterID=${supporterID}`}
                          >
                            <button className="list-group-item list-group-item-action list-group-item-secondary">
                              {project.ProjectName}
                            </button>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p>
                        <i>No projects</i>
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {projects.length ? (
                      <div className="list-group">
                        {projects.map((project) => (
                          <Link
                            to={`projects?projectID=${project.ProjectID}&supporterID=${supporterID}`}
                          >
                            <button className="list-group-item list-group-item-action list-group-item-secondary">
                              {project.ProjectName}
                            </button>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p>
                        <i>No projects</i>
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <label>Sort Projects:</label>
            <input
              type="checkbox"
              checked={isSorted}
              onChange={() => setIsSorted((state) => !state)}
            />
          </div>
          <div className="col">
            <h2>Pledges</h2>
            {claims.length ? (
              <div>
                {claims.map((claim) => (
                  <div>
                    <p>Amount: {claim.Amount}</p>
                    <p>Reward: {claim.Reward}</p>
                    <Link
                      to={`projects?projectID=${claim.ProjectID}&supporterID=${supporterID}`}
                    >
                      {claim.ProjectName}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                <i>No Pledges</i>
              </p>
            )}
          </div>
          <div className="col">
            <h2>Direct Supports</h2>
            {directSupports.length ? (
              <div>
                {directSupports.map((dS) => (
                  <div>
                    <p>Amount: {dS.Amount}</p>
                    <Link
                      to={`projects?projectID=${dS.ProjectID}&supporterID=${supporterID}`}
                    >
                      {dS.ProjectName}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                <i>No Direct Supports</i>
              </p>
            )}
          </div>
          <div className="col">
            <h1 className="mb-4">Successful Projects Supported</h1>
            <h2>Pledges</h2>
            {successClaims.length ? (
              <div>
                {successClaims.map((claim) => (
                  <div>
                    <p>
                      <b>{claim.ProjectName}</b>
                    </p>
                    <p>Amount: {claim.Amount}</p>
                    <p>Reward: {claim.Reward}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                <i>No Pledges</i>
              </p>
            )}
            <h2>Direct Supports</h2>
            {successDirectSupports.length ? (
              <div>
                {successDirectSupports.map((dS) => (
                  <div>
                    <p>
                      <b>{dS.ProjectName}</b>
                    </p>
                    <p>Amount: {dS.Amount}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                <i>No Direct Supports</i>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
