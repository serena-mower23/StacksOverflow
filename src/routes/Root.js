import { Outlet, Link, useLoaderData } from "react-router-dom";

export async function getProjects() {
  const projects = [{
    projectID: "fucker",
    projectName: "Test Project",
    projectDesigner: "Fuck Michael",
    avatar: "https://placekitten.com/g/200/200",
    reward: "Reward spot",
  }]
  return projects;
}

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export default function Root() {
  const { projects } = useLoaderData();
  return (
    <>
      <div id="sidebar">
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
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
        {projects.length ? (
            <ul>
              {projects.map((project) => (
                <li key={project.projectID}>
                  <Link to={`projects/${project.projectID}`}>
                      <p>
                        {project.projectName}
                      </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No projects</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
