import React, {useState, useRef} from "react";
import { Outlet, Link, redirect } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod"
})

function Root() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const designerLoginHandler = () => {
    console.log(inputUsername);
    console.log(inputPassword);

    let request = {
      "accountType": "Designers",
      "email": inputUsername,
      "password": inputPassword
    }
    let value = JSON.stringify(request)

    let data = { "body" : value }

    instance.post("/login", data)
      .then(function (response) {
        redirect(`/designer/id=${inputUsername}`);
        // if (response.data.statusCode === 200) { 
        //   redirect(`/designer/${inputUsername}`);
        // }
      })
      .catch(function(error) {
        document.getElementById("errorMessage").value = error;
      })
  }

  const supporterLoginHandler = () => {
    console.log(inputUsername);
    console.log(inputPassword);

    let request = {
      "accountType": "Supporters",
      "email": inputUsername,
      "password": inputPassword
    }
    let value = JSON.stringify(request)

    let data = { "body" : value }

    instance.post("/login", data)
      .then(function (response) {
        if (response.data.statusCode === 200) { 
          redirect(`/supporter/id=${inputUsername}`);
        }
      })
      .catch(function(error) {
        document.getElementById("errorMessage").value = error;
      })
  }

  const adminLoginHandler = () => {
    console.log(inputUsername);
    console.log(inputPassword);

    let request = {
      "accountType": "Admins",
      "email": inputUsername,
      "password": inputPassword
    }
    let value = JSON.stringify(request)

    let data = { "body" : value }

    instance.post("/login", data)
      .then(function (response) {
        if (response.data.statusCode === 200) { 
          redirect(`/admin`);
        }
      })
      .catch(function(error) {
        document.getElementById("errorMessage").value = error;
      })
  }

  return (
    <>
      <div id="detail">
        <h2>$tackOverflow</h2>
            <p>Enter your email:</p>
            <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)}></input>
            <p>Enter your password:</p>
            <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}></input>
            <div>
              <button onClick={(e) => designerLoginHandler()}>Designer Login</button>
              <button onClick={(e) => supporterLoginHandler()}>Supporter Login</button>
              <button onClick={(e) => adminLoginHandler()}>Admin Login</button>
            </div>
          <Link to={`/createDesigner`}>
            <p>
              Create Designer Account
            </p>
          </Link>
          <Link to={`/createSupporter`}>
            <p>
              Create Supporter Account
            </p>
          </Link>
          <h3 id="errorMessage"></h3>
      </div>
    </>
  );
}
export default Root;
