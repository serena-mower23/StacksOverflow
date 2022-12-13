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

  React.useEffect(() => {});

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

    for (let j = 0; j < response.length; j++) {
      const response2 = await viewProject(response[j].ProjectID);
      if (response2[0].Status === "Active") {
        activeTransactions.push(response[j]);
      }
    }

    for (let i = 0; i < activeTransactions.length; i++) {
      if (response[i].TemplateID === "N/A") {
        directSupports.push(response[i]);
      } else {
        const reward = await getReward(response[i].TemplateID);
        response[i]["Reward"] = reward;
        claims.push(response[i]);
      }
    }
    setClaims(claims);
    setDirectSupports(directSupports);
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
          <div className="col-11">
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
                      <ul>
                        {searchedProjects.map((project) => (
                          <li key={project.ProjectID}>
                            <Link
                              to={`projects?projectID=${project.ProjectID}&supporterID=${supporterID}`}
                            >
                              <button className="btn btn-secondary">
                                {project.ProjectName}
                              </button>
                            </Link>
                          </li>
                        ))}
                      </ul>
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
            <h2>List of Pledges</h2>
            {claims.length ? (
              <ul>
                {claims.map((claim) => (
                  <li key={claim.TransactionID}>
                    <p>Amount: {claim.Amount}</p>
                    <p>Reward: {claim.Reward}</p>
                    <Link
                      to={`projects?projectID=${claim.ProjectID}&supporterID=${supporterID}`}
                    >
                      View Project
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No Pledges</i>
              </p>
            )}
          </div>
          <div className="col">
            <h2>List of Direct Supports</h2>
            {directSupports.length ? (
              <ul>
                {directSupports.map((dS) => (
                  <li key={dS.TransactionID}>
                    <p>Amount: {dS.Amount}</p>

                    <Link
                      to={`projects?projectID=${dS.ProjectID}&supporterID=${supporterID}`}
                    >
                      <button className="btn btn-primary">View Project</button>
                    </Link>
                  </li>
                ))}
              </ul>
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
