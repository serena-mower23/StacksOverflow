import { register } from "./controller/Controller";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function CreateSupporter() {
  const [inputNewUsername, setInputUsername] = React.useState("");
  const [inputNewPassword, setInputPassword] = React.useState("");
  const [inputName, setInputName] = React.useState("");
  const navigate = useNavigate();

  const createSupporterHandler = async () => {
    const result = await register(
      "Supporter",
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

  const logoutHandler = async () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <label className="navbar-brand m-2 h1">
            &#128184; $tacksOverflow &#128184;
          </label>
          <button
            className="nav-link btn btn-link"
            onClick={(e) => logoutHandler()}
          >
            Go back to login
          </button>
        </div>
      </nav>
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
          <button onClick={(e) => createSupporterHandler()}>
            Create Supporter
          </button>
        </div>
      </div>
    </div>
  );
}
