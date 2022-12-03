import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  listSupporterPledges,
  getFunds,
  updateFunds,
} from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";
import NavBar from "./NavBar";

export default function Supporter() {
  const params = new URLSearchParams(window.location.search);
  const supporterID = params.get("supporterID");

  const [claims, setClaims] = React.useState("");
  const [directSupports, setDirectSupports] = React.useState("");
  const [funds, setFunds] = React.useState("");
  const [fundAmount, setFundAmount] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    // loadTransactionsHandler();
    // loadFundsHandler();
  }, []);

  const loadTransactionsHandler = async () => {
    const response = await listSupporterPledges(supporterID);

    let claims = [];
    let directSupports = [];

    for (let i = 0; i < response.length; i++) {
      if (response[i].TransactionID === undefined) {
        directSupports.push(response[i]);
      } else {
        claims.push(response[i]);
      }
    }
    setClaims(claims);
    setDirectSupports(directSupports);
  };

  const loadFundsHandler = async () => {
    const response = await getFunds(supporterID);

    setFunds(response.funds);
  };

  const addFunds = async () => {
    const response = await updateFunds(supporterID, fundAmount);
    setFunds(response.funds);
  };

  const refreshPage = () => {
    navigate(0);
  };

  const logoutHandler = async () => {
    navigate("/");
  };

  return (
    <div>
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
                  Add Funds
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
      <div className="m-5 row">
        <div className="col-6">
          <h2>List of Pledges</h2>
          {claims.length ? (
            <ul>
              {claims.map((claim) => (
                <li key={claim.TransactionID}>
                  <Link
                    to={`projects?projectID=${claim.ProjectID}&supporterID=${supporterID}`}
                  >
                    <p>{claim.ProjectName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Claims</i>
            </p>
          )}
          <h2>List of Direct Supports</h2>
          {directSupports.length ? (
            <ul>
              {directSupports.map((dS) => (
                <li>
                  <Link
                    to={`projects?projectID=${dS.ProjectID}&supporterID=${supporterID}`}
                  >
                    <p>{dS.ProjectName}</p>
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
  );
}
