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

  const logoutHandler = async () => {
    navigate(-1);
  };

  return (
    <div className="container d-flex flex-column mt-2 align-items-center">
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
              Go back to login
            </button>
          </div>
        </div>
      </nav>
      <div className="align-items-center">
        <h2 className="text-center">Create Designer Account</h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Email:
          </label>
          <input
            className="form-control form-control-lg"
            type="text"
            name="username"
            id="username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
          <div className="invalid-feedback">Please provide a username.</div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-control form-control-lg"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
          <div className="invalid-feedback">Please provide a password.</div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Name
          </label>
          <input
            className="form-control form-control-lg"
            type="text"
            onChange={(e) => setInputName(e.target.value)}
            required
          />
          <div className="invalid-feedback">Please provide a password.</div>
        </div>
        <div className="d-grid d-sm-block text-center">
          <button
            className="btn btn-primary"
            onClick={(e) => createDesignerHandler()}
          >
            Create Designer &#129297;
          </button>
        </div>
      </div>
    </div>
  );
}
