import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";

export async function getProjects() {
  const projects = [{
    projectName: "Test Project",
    projectDesigner: "Fuck Michael",
    avatar: "https://placekitten.com/g/200/200",
    reward: "Reward spot",
  }]
  return projects;
}

export async function createProject() { 

}

export async function action() {
    await createProject();
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
        </div>
        <nav>
        {projects.length ? (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <Link to={`projects/${project.id}`}>
                      <p>
                        {project.projectName} {project.projectDesigner}
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
        <Form method="post">
            <button type="submit">New Project</button>
        </Form>
        <Outlet />
      </div>
    </>
  );
}
