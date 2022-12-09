import React from "react";
import { viewProject } from "./controller/Controller";
import { Link, useNavigate } from "react-router-dom";
import {
  viewTransactions,
  viewTemplates,
  deletePledge,
  getDesignerInfo,
  getSupporterInfo,
  viewSupporterTemplate,
  launchProject,
  deleteProject,
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
    const currentDate = project.Deadline;
    const newDate =
      currentDate.substring(0, 12) + "6" + currentDate.substring(13);
    const date = new Date(newDate);
    project["Deadline"] = date;
    setProject(project);
  };

  const getDesignerName = async () => {
    const response = await getDesignerInfo(designerID);
    setDesignerName(response[0].Name);
  };

  const grabTransactions = async () => {
    const response = await viewTransactions(projectID);
    let supporters = [];
    for (let i = 0; i < response.length; i++) {
      const supporter = await getSupporterInfo(response[i].SupporterID);
      let info = {};
      if (response[i].TemplateID !== "N/A") {
        const response2 = await viewSupporterTemplate(response[i].TemplateID);
        info = {
          supporterName: supporter[0].Name,
          amount: response[i].Amount,
          reward: response2[0].Reward,
        };
      } else {
        info = {
          supporterName: supporter[0].Name,
          amount: response[i].Amount,
          reward: "Direct Support",
        };
      }
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

  const launchProjectHandler = async (projectID) => {
    const response = await launchProject(projectID);

    if (response === "true") {
      navigate(-1);
    }
  };

  const deleteProjectHandler = async (projectID) => {
    const response = await deleteProject(projectID);

    if (response === "true") {
      navigate(-1);
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
      <button onClick={(e) => dashboardHandler()} className="btn btn-primary">
        Close Project
      </button>
      <div className="row">
        <div className="col-4">
          <h1>{project.ProjectName}</h1>
          <p>Project Designer: {designerName}</p>
          <p>Project Type: {project.ProjectType}</p>
          <p>Project Story: {project.ProjectStory}</p>
          <p>
            Money Raised: ${project.MoneyRaised} / ${project.ProjectGoal}
          </p>
          <p>Number of Supporters: {project.NumSupporters}</p>
          <p>
            Project Deadline:{" "}
            {new Date(project.Deadline - 5).toLocaleDateString()}
            {/* Project Deadline: {project.Deadline} */}
          </p>
          <h4>Pledges</h4>
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
                    <p>Pledge Amount: {pledge.PledgeAmount}</p>
                    <p>Pledge Reward: {pledge.Reward}</p>
                    {project.IsLaunched === 0 ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => deletePledgeHandler(pledge.TemplateID)}
                      >
                        Delete Pledge
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
              <button
                className="btn btn-success"
                onClick={() => launchProjectHandler(project.ProjectID)}
              >
                Launch Project
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteProjectHandler(project.ProjectID)}
              >
                Delete Project
              </button>
            </div>
          ) : (
            <div>
              <h3>Project Supporters</h3>
              <ul>
                {transactions.length ? (
                  <ul>
                    {transactions.map((transaction) => (
                      <li key={transaction.amount}>
                        <p>Supporter Name: {transaction.supporterName}</p>
                        {transaction.reward === "Direct Support" ? (
                          <p>Direct Support</p>
                        ) : (
                          <p>Pledge: {transaction.reward}</p>
                        )}
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
