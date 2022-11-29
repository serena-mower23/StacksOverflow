import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";

export async function getProjects() {
  const projects = [
    {
    projectID: "fucker",
    projectName: "Test Project",
    projectDesigner: "Fuck Michael",
    reward: "Reward spot",
    isLaunched: true
    },
    {
        projectID: "fucker2",
        projectName: "Test Project 2.0",
        projectDesigner: "Fuck Michael Again",
        reward: "Reward spot",
        isLaunched: false
    },

]
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
        {projects.length ? (
            <ul>
            {projects.map((project) => (
                <div>
                    {project.isLaunched ? (
                        <>
                            <h2>List of Active Projects</h2>
                            <li key={project.projectID}>
                            <Link to={`projects/${project.projectID}`}>
                                <p>
                                    {project.projectName}
                                </p>
                            </Link>
                            </li>
                        </>
                    ) : ( 
                        <>
                            <h2>List of Inactive Projects</h2>
                            <li key={project.projectID}>
                            <Link to={`projects/${project.projectID}`}>
                                <p>
                                    {project.projectName}
                                </p>
                            </Link>
                            </li>
                        </>
                    )}
                </div>
            ))}
            </ul>
        ) : (
            <p>
              <i>No projects</i>
            </p>
          )}
      </div>
      <Outlet />
      <div id="detail">
        <Form method="post">
            <button type="submit">New Project</button>
        </Form>
      </div>
    </>
  );
}
