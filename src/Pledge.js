import React from "react";
import { createPledge } from "./controller/Controller";
export async function action(inputAmount, inputSupporters, inputReward) {
  const params = new URLSearchParams(window.location.search);
  const projectID = params.get("projectID");
  await createPledge(projectID, inputAmount, inputSupporters, inputReward);
}

export default function Pledge() {
  const [inputAmount, setInputAmount] = React.useState("");
  const [inputSupporters, setInputSupporters] = React.useState("");
  const [inputReward, setInputReward] = React.useState("");

  return (
    <div id="detail">
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
        <button
          onClick={(e) => action(inputAmount, inputSupporters, inputReward)}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
