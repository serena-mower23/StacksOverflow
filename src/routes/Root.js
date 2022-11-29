import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getProjects } from "../projects";

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export default function Root() {
  const { projects } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Projects</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">Log In</button>
          </form>
          <body>
            <form >
              <p>"Enter your email"</p>
              <script>
                const email = document.createElement("input");
                email.setAttribute("type", "text");
                document.body.appendChild(email);
              </script>

              <p>"Enter your password"</p>
              <script>
                const password = document.createElement("input");
                password.setAttribute("type", "text");
                document.body.appendChild(password);
              </script>
              <button type="submit">Input</button>
            </form>
          </body>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`project/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`project/2`}>Your Friend</Link>
            </li>
          </ul>
          <ul>
            <li>
              <a href={`supporter/1`}>Your Mom</a>
            </li>
            <li>
              <a href={`supporter/2`}>Your Dad</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
