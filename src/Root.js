import React, { useState } from "react";
import { Link, useNavigate, Form } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod",
});

function Root() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  const designerLoginHandler = async () => {
    console.log(inputUsername);
    console.log(inputPassword);

    let request = {
      accountType: "Designers",
      email: inputUsername,
      password: inputPassword,
    };
    let value = JSON.stringify(request);

    let data = { body: value };
    console.log(data);

    const response = await instance.post("/login", data);
    if (response.data.statusCode === 200) {
      navigate(`/designer?designerID=${inputUsername}`);
    } else {
      alert(response.data.error);
    }
  };

  const supporterLoginHandler = async () => {
    console.log(inputUsername);
    console.log(inputPassword);

    let request = {
      accountType: "Supporters",
      email: inputUsername,
      password: inputPassword,
    };
    let value = JSON.stringify(request);

    let data = { body: value };
    console.log(data);

    const response = await instance.post("/login", data);
    if (response.data.statusCode === 200) {
      navigate(`/supporter?supporterID=${inputUsername}`);
    } else {
      alert(response.data.error);
    }
  };

  const adminLoginHandler = async () => {
    console.log(inputUsername);
    console.log(inputPassword);

    let request = {
      accountType: "Admins",
      email: inputUsername,
      password: inputPassword,
    };
    let value = JSON.stringify(request);

    let data = { body: value };
    console.log(data);

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
        <h2>$tacksOverflow</h2>
        <p>Enter your email:</p>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className="mb-3 form-control"
        ></input>
        <p>Enter your password:</p>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="mb-3 form-control"
        ></input>
        <div className="d-grid d-sm-block text-center">
          <button
            className="btn btn-primary m-1"
            onClick={(e) => designerLoginHandler()}
          >
            &#129297; Designer Login
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={(e) => supporterLoginHandler()}
          >
            &#128179; Supporter Login
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={(e) => adminLoginHandler()}
          >
            {" "}
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
