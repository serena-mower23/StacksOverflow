import { Outlet, Link } from "react-router-dom";

export async function loader() {
}


export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other elements */}

        <nav>
          <ul>
            <li>
              <Link to={`designer`}>Your Name</Link>
            </li>
          </ul>
        </nav>
        <div id="detail">
        <Outlet />
        </div>
      </div>
    </>
  );
}