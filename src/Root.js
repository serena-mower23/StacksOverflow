import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "./controller/Controller";
const instance = axios.create({
  baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod",
});

function Root() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  const designerLoginHandler = async () => {
    const response = await login("Designers", inputUsername, inputPassword);
    if (response === "true") {
      navigate(`/designer?designerID=${inputUsername}`);
    } else {
      alert(response);
    }
  };

  const supporterLoginHandler = async () => {
    const response = await login("Supporters", inputUsername, inputPassword);
    if (response === "true") {
      navigate(`/supporter?supporterID=${inputUsername}`);
    } else {
      alert(response);
    }
  };

  const adminLoginHandler = async () => {
    let request = {
      accountType: "Admins",
      email: inputUsername,
      password: inputPassword,
    };
    let value = JSON.stringify(request);

    let data = { body: value };

    const response = await instance.post("/login", data);
    if (response.data.statusCode === 200) {
      navigate("/admin");
    } else {
      alert(response.data.error);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column align-items-center">
      <img src="stacks.png" width="100" />
        <nav className="navbar navbar-expand-lg">
          <label className=" m-2 h1">&#128184; $tacksOverflow &#128184;</label>
        </nav>
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
        <div className="d-grid d-sm-block text-center">
          <button
            type="submit"
            className="btn btn-primary m-2"
            onClick={(e) => designerLoginHandler()}
          >
            &#129297; Designer Login
          </button>
        </div>
        <div className="d-grid d-sm-block text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => supporterLoginHandler()}
          >
            &#128179; Supporter Login
          </button>
        </div>
        <div className="d-grid d-sm-block mt-2 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => adminLoginHandler()}
          >
            &#129299; Admin Login
          </button>
        </div>
        <div className="mt-3">
          <Link to={`/createDesigner`}>
            <p>Create Designer Account</p>
          </Link>
        </div>
        <div className="mb-3">
          <Link to={`/createSupporter`}>
            <p>Create Supporter Account</p>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Root;
