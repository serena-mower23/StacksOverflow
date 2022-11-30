import React, {useState, useRef} from "react";
import { Outlet, Link, redirect } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod"
})

function Root() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const designerLoginHandler = async () => {
    console.log(inputUsername);
    console.log(inputPassword);
    console.log("ANYBODY THERE?");

    let request = {
      "accountType": "Designers",
      "email": inputUsername,
      "password": inputPassword
    }
    let value = JSON.stringify(request)

    let data = { "body" : value }
    console.log(data);

    const response = await instance.post("/login", data)  
    if (response.data.statusCode === 200) {
      console.log("redirect")
      redirect(`/designer/id=${inputUsername}`);
    }
    else {
      alert(response.data.error);
    }
  }

  const supporterLoginHandler = async () => {
    console.log(inputUsername);
    console.log(inputPassword);
    console.log("ANYBODY THERE?");

    let request = {
      "accountType": "Supporters",
      "email": inputUsername,
      "password": inputPassword
    }
    let value = JSON.stringify(request)

    let data = { "body" : value }
    console.log(data);

    const response = await instance.post("/login", data)  
    if (response.data.statusCode === 200) {
      console.log("redirect")
      redirect(`/supporter/id=${inputUsername}`);
    }
    else {
      alert(response.data.error);
    }
  }

  const adminLoginHandler = async () => {
    console.log(inputUsername);
    console.log(inputPassword);
    console.log("ANYBODY THERE?");

    let request = {
      "accountType": "Admins",
      "email": inputUsername,
      "password": inputPassword
    }
    let value = JSON.stringify(request)

    let data = { "body" : value }
    console.log(data);

    const response = await instance.post("/login", data)  
    if (response.data.statusCode === 200) {
      console.log("redirect")
      redirect("/admin");
    }
    else {
      alert(response.data.error);
    }
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
      </div>
    </>
  );
}
export default Root;
