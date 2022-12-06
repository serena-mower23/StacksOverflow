import { register } from "./controller/Controller";
import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container d-flex flex-column mt-2 align-items-center">
      <nav className="navbar navbar-expand-lg">
        <label className="m-2 h1">&#128184; $tacksOverflow &#128184;</label>
        <button
          className="nav-link btn btn-link"
          onClick={(e) => logoutHandler()}
        >
          Go back to login
        </button>
      </nav>
      <h2>Create Supporter Account</h2>
      <form className="needs-validation">
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
      </form>
      <button
        className="btn btn-primary"
        onClick={(e) => createSupporterHandler()}
      >
        Create Supporter &#128179;
      </button>
    </div>
  );
}
