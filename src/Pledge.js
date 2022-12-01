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
  console.log(response);
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
    console.log(response);

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
      <button onClick={(e) => projectDetailsHandler()}>
        Back to Project Details
      </button>
      <h2>Create Pledge</h2>
      <p>Pledge Amount:</p>
      <input
        type="text"
        onChange={(e) => setInputAmount(e.target.value)}
      ></input>
      <p>Max Supporters:</p>
      <input
        type="text"
        onChange={(e) => setInputSupporters(e.target.value)}
      ></input>
      <p>Pledge Reward:</p>
      <input
        type="text"
        onChange={(e) => setInputReward(e.target.value)}
      ></input>
      <div>
        <button onClick={(e) => createPledgeHandler()}>Create Pledge</button>
      </div>
    </div>
  );
}
