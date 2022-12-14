import React from "react";
import { createPledge } from "./controller/Controller";
import { useNavigate } from "react-router-dom";

export async function action(
  projectID,
  inputSupporters,
  inputAmount,
  inputReward
) {
  const response = await createPledge(
    projectID,
    inputSupporters,
    inputAmount,
    inputReward
  );
  return response;
}

export default function Pledge() {
  const [inputAmount, setInputAmount] = React.useState("");
  const [inputSupporters, setInputSupporters] = React.useState("");
  const [inputReward, setInputReward] = React.useState("");
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  const navigate = useNavigate();

  const createPledgeHandler = async () => {
    const response = await action(
      projectID,
      inputSupporters,
      inputAmount,
      inputReward
    );

    if (response === "true") {
      navigate(-1);
    } else {
      alert("Cry");
    }
  };

  const projectDetailsHandler = async () => {
    navigate(-1);
  };

  return (
    <div id="detail">
      <button
        className="btn btn-primary"
        onClick={(e) => projectDetailsHandler()}
      >
        Back to Project Details
      </button>
      <h2>Create Pledge</h2>
      <p>Pledge Amount:</p>
      <input
        type="text"
        onChange={(e) => setInputAmount(e.target.value)}
      ></input>
      <p>Max Supporters:</p>
      <p>
        <i>For no limit, leave blank.</i>
      </p>
      <input
        type="text"
        onChange={(e) => setInputSupporters(e.target.value)}
      ></input>
      <p>Pledge Reward:</p>
      <p>
        <i>For no reward, leave blank.</i>
      </p>
      <input
        type="text"
        onChange={(e) => setInputReward(e.target.value)}
      ></input>
      <div>
        <button
          className="btn btn-primary"
          onClick={(e) => createPledgeHandler()}
        >
          Create Pledge
        </button>
      </div>
    </div>
  );
}
