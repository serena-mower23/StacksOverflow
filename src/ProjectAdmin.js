import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  viewTemplates,
  viewProject,
  deleteProject,
} from "./controller/Controller";

export default function ProjectAdmin() {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const [pledges, setPledges] = React.useState("");
  const [project, setProject] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    grabPledgeTemplates();
    loadDataHandler();
  }, []);

  const loadDataHandler = async () => {
    const response = await viewProject(projectID);
    const project = await response[0];
    const currentDate = project.Deadline;
    const newDate =
      currentDate.substring(0, 12) + "6" + currentDate.substring(13);
    const date = new Date(newDate);
    project["Deadline"] = date;
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

  const dashboardHandler = async () => {
    navigate(-1);
  };

  const logoutHandler = async () => {
    navigate("/");
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
              className="btn btn-primary"
              onClick={(e) => logoutHandler()}
            >
              Log out of Admin
            </button>
          </div>
        </div>
      </nav>
      <div>
        <button className="btn btn-primary" onClick={(e) => dashboardHandler()}>
          Close Project
        </button>
        <h1>{project.ProjectName}</h1>
        <p>Project Type: {project.ProjectType}</p>
        <p>Project Story: {project.ProjectStory}</p>
        <p>
          Money Raised: ${project.MoneyRaised} / ${project.ProjectGoal}
        </p>
        <p>Project Status: {project.Status}</p>
        <p>Number of Supporters: {project.NumSupporters}</p>
        <p>
          Project Deadline:{" "}
          {new Date(project.Deadline - 5).toLocaleDateString()}
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
                  <p>Pledge Amount: ${pledge.PledgeAmount}</p>
                  <p>Pledge Reward: {pledge.Reward}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Pledges</i>
            </p>
          )}
        </ul>
      </div>{" "}
      <button
        className="btn btn-danger"
        onClick={() => deleteProjectHandler(projectID)}
      >
        Delete Project
      </button>
    </div>
  );
}
