import { Outlet, Link, useNavigate } from "react-router-dom";
import { listSupporterPledges } from "./controller/Controller";
import React from "react";
import "url-search-params-polyfill";
import NavBar from "./NavBar";

export default function Supporter() {
  const params = new URLSearchParams(window.location.search);
  const supporterID = params.get("supporterID");

  const [claims, setClaims] = React.useState("");
  const [directSupports, setDirectSupports] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    loadDataHandler();
  }, []);

  const loadDataHandler = async () => {
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

  const refreshPage = () => {
    navigate(0);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="row">
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
