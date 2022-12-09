import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  viewSupporterTransactions,
  updateFunds,
  listProjects,
  searchProjects,
  getSupporterInfo,
  getSortedProjects,
  viewSupporterTemplate
} from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";
import Select from "react-select";

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
  const [isSorted, setIsSorted] = React.useState("");
  const [supporterName, setSupporterName] = React.useState("");
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

  const genres = [
    { value: "Art", label: "Art" },
    { value: "Education", label: "Education" },
    { value: "Fashion", label: "Fashion" },
    { value: "Food", label: "Food" },
    { value: "Game", label: "Game" },
    { value: "Movie", label: "Movie" },
    { value: "Music", label: "Music" },
    { value: "Toy", label: "Toy" },
    { value: "Techology", label: "Technology" },
    { value: "Other", label: "Other" },
  ];

  const getReward = async (templateID) => {
    const response = await viewSupporterTemplate(templateID);

    let reward = response[0].Reward;
    return reward;
  };

  const loadTransactionsHandler = async () => {
    const response = await viewSupporterTransactions(supporterID);

    let claims = [];
    let directSupports = [];

    for (let i = 0; i < response.length; i++) {
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
    setSupporterName(response[0].Name);
    setFunds(response[0].Funds)
  };

  const loadProjectsHandler = async () => {
    const response = await listProjects();
    console.log("Hello???");
    console.log(response)
    let activeProjects = [];
    for (let i = 0; i < response.length; i++) {
      if (response[i].IsLaunched === 1) {
        activeProjects.push(response[i]);
      }
    }
    setProjects(activeProjects);
  };

  const addFunds = async () => {
    const response = await updateFunds(supporterID, fundAmount);
    if (response === "true") {
      const response2 = await getSupporterInfo(supporterID);
      setFunds(response2[0].Funds)
      refreshPage();
    }
  };

  const genreHandler = (genre) => {
    let currentGenres = [];
    for (let i = 0; i < search.length; i++) {
      currentGenres.push(search[i]);
    }
    currentGenres.push(genre);
    setSearch(genre);
  };

  const genreSearchHandler = () => {
    let listProjects = [];

    for (let j = 0; j < projects.length; j++) {
      if (projects[j].ProjectType === search) {
        listProjects.push(projects[j]);
      }
    }

    setSearchedProjects(listProjects);
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
      if (response[i].IsLaunched === 1) {
        activeProjects.push(response[i]);
      }
    }
    setProjects(activeProjects);
  };

  // const searchHandler = async () => {
  //   const response = await searchProjects(search);
  // };

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

      <div className="row justify-content-evenly">
        <div className="col-5">
          <h2>Search Projects</h2>
          {/* <input
            type="text"
            placeholder="Search Projects..."
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <div className="row">
            <div className="col-8">
              <Select
                isSearchable={false}
                options={genres}
                onChange={(e) => genreHandler(e.value)}
              />
              <button
                className="btn btn-primary"
                onClick={(e) => genreSearchHandler()}
              >
                Search By Genre
              </button>
            </div>
            {/* <div className="col-6">
              <label>Sort Projects:</label>
              <input
                type="checkbox"
                checked={isSorted}
                onChange={() => setIsSorted((state) => !state)}
              />
            </div> */}
          </div>
        </div>
        <div className="col-3">
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
        <div className="col-3">
          <h2>List of Direct Supports</h2>
          {directSupports.length ? (
            <ul>
              {directSupports.map((dS) => (
                <li>
                  <p>Amount: {dS.Amount}</p>
                  <Link
                    to={`projects?projectID=${dS.ProjectID}&supporterID=${supporterID}`}
                  >
                    <p>View Project</p>
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
      <div className="m-5 row">
        <div className="col-4">
          {search === "" ? (
            <>
              {projects.length ? (
                <ul>
                  {projects.map((project) => (
                    <li key={project.ProjectID}>
                      <Link
                        to={`projects?projectID=${project.ProjectID}&supporterID=${supporterID}`}
                      >
                        <p>{project.ProjectName}</p>
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
              {searchedProjects.length ? (
                <ul>
                  {searchedProjects.map((project) => (
                    <li key={project.ProjectID}>
                      <Link
                        to={`projects?projectID=${project.ProjectID}&supporterID=${supporterID}`}
                      >
                        <p>{project.ProjectName}</p>
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
          )}
        </div>
      </div>
    </div>
  );
}
