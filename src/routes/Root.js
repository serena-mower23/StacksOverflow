import { Outlet, Link } from "react-router-dom";

export async function loader() {}

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
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
              <a href={`designer/1`}>Your Name</a>
            </li>
            <li>
              <a href={`designer/2`}>Your Friend</a>
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
      <div id="detail"></div>
    </>
  );
}
