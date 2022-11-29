import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="detail">
        <h2>$tackOverflow</h2>
          <form method="post" action="/login">
            <p>Enter your email:</p>
            <input type="text"></input>
            <p>Enter your password</p>
            <input type="password"></input>
            <div>
              <button type="submit">Designer Login</button>
              <button type="submit">Supporter Login</button>
            </div>
          </form>
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