import { Form } from "react-router-dom";

export function Project() {
  const project = {
    projectID: "fucker",
    projectName: "Test Project",
    projectDesigner: "Fuck Michael",
    reward: "Reward spot",
    isLaunched: true
};

return (
  <div id="project">
    <div>
      <img
        key={project.avatar}
        src={project.avatar || null}
      />
    </div>

    <div>
      <h1>
        {project.first || project.last ? (
          <>
            {project.first} {project.last}
          </>
        ) : (
          <i>No Name</i>
        )}{" "}
      </h1>

      {project.twitter && (
        <p>
          <a
            target="_blank"
            href={`https://twitter.com/${project.twitter}`}
          >
            {project.twitter}
          </a>
        </p>
      )}

      {project.notes && <p>{project.notes}</p>}

      <div>
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
      </div>
    </div>
  </div>
);
}
