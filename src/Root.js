import { Outlet, Link } from "react-router-dom";

function Root() {
  const designerLoginHandler = (info) => {
    console.log(info);
  }

  const supporterLoginHandler = (info) => {
    console.log(info);
  }

  return (
    <>
      <div id="detail">
        <h2>$tackOverflow</h2>
          <form>
            <p>Enter your email:</p>
            <input type="text"></input>
            <p>Enter your password:</p>
            <input type="password"></input>
            <div>
              <button onClick={(e) => designerLoginHandler(e)}>Designer Login</button>
              <button onClick={(e) => designerLoginHandler(e)}>Supporter Login</button>
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
export default Root;
