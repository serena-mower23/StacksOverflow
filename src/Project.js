import React from "react";
import { viewProject } from "./controller/Controller";
import { useLoaderData, Outlet, Link, useNavigate } from "react-router-dom";
import { viewTemplates, viewTransactions } from "./controller/Controller";

export default function Project() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const designerID = params.get("designerID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const [transactions, setTransactions] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    grabPledgeTemplates();
    grabTransactions();
    loadDataHandler();
  }, []);

  const loadDataHandler = async () => {
    const response = await viewProject(projectID);
    const project = response[0];
    let moneyRaised = 0;
    console.log(typeof transactions);
    // console.log(transactions);
    for(var i = 0; i < transactions.length; i++){
      console.log(transactions[i])
      let amount = transactions[i].Amount
      moneyRaised += amount;
      console.log(moneyRaised)
    }
    project["MoneyRaised"] = moneyRaised;
    setProject(project);
  };

  const grabPledgeTemplates = async () => {
    console.log("I WANT YOU TO WORK");
    const response = await viewTemplates(projectID);
    console.log("YALL ARE CRAZY");
    console.log(response);
    setPledges(response);
  };

  const grabTransactions = async () => {
    const response = await viewTransactions(projectID);
    console.log(response);
    setTransactions(response);
  };

  const dashboardHandler = async () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <button onClick={(e) => dashboardHandler()}>Close Project</button>
        <h1>{project.ProjectName}</h1>
        <p>{project.ProjectType}</p>
        <p>{project.ProjectStory}</p>
        <p>{project.ProjectGoal}</p>
        <p>{project.MoneyRaised}</p>
        <p>{project.NumSupporter}</p>
        <p>{project.Deadline}</p>
        <h4>Pledges</h4>
        <ul>
          {pledges.length ? (
            <ul>
              {pledges.map((pledge) => (
                <li>
                  <p>{pledge.MaxSupporters}</p>
                  <p>{pledge.PledgeAmount}</p>
                  <p>{pledge.Reward}</p>
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
      <div id="details">
        <Link
          to={`/createPledge?projectID=${[projectID]}&designerID=${designerID}`}
        >
          <p>Create New Pledge</p>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
