export default function Project() {
    const project = {
      projectID: "fucker",
      projectName: "Test Project",
      projectDesigner: "Fuck Michael",
      reward: "Reward spot",
      isLaunched: true
  };
  
  return (
    <div id="project">
        <h1>
          {project.projectName}
        </h1>
        <p>
          {project.projectDesigner}
        </p>
        <p>
          {project.reward}
        </p>
    </div>
  );
  }