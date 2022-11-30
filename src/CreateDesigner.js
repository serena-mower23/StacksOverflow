import { register } from "./controller/Controller";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateDesigner() {
  const [inputNewUsername, setInputUsername] = React.useState("");
  const [inputNewPassword, setInputPassword] = React.useState("");
  const [inputName, setInputName] = React.useState("");
  const navigate = useNavigate();

  const createDesignerHandler = async () => {
    const result = await register(
      "Designer",
      inputName,
      inputNewUsername,
      inputNewPassword
    );
    if (result === "true") {
      navigate("/");
      alert("Account successfully created!");
    } else {
      alert(result);
    }
  };
  return (
    <>
      <h2>$tacksOverflow</h2>
      <div id="detail">
        <p>Email:</p>
        <input
          type="text"
          onChange={(e) => setInputUsername(e.target.value)}
        ></input>
        <p>Password:</p>
        <input
          type="text"
          onChange={(e) => setInputPassword(e.target.value)}
        ></input>
        <p>Name:</p>
        <input
          type="text"
          onChange={(e) => setInputName(e.target.value)}
        ></input>
        <div>
          <button onClick={(e) => createDesignerHandler()}>
            Create Designer
          </button>
        </div>
      </div>
    </>
  );
}
