import axios from "axios";

const instance = axios.create({
  baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod",
});

export async function listDesignerProjects(id) {
  let projects = [];

  let request = {
    designerID: id,
  };
  let value = JSON.stringify(request);

  let data = { body: value };

  const response = await instance.post("/listDesignerProjects", data);
  console.log("/listDesignerProjects");
  console.log(response.data);
  if (response.data.statusCode === 200) {
    projects = response.data.body;
  } else {
    alert(response.data.error);
  }
  return projects;
}

export async function listProjects() {
  let projects = [];
  const response = await instance.get("/listProjects");
  console.log("/listProjects");
  console.log(response.data.body);
  if (response.data.statusCode === 200) {
    projects = response.data.body;
  } else {
    alert(response.data.error);
  }
  return projects;
}

export async function viewProject(projectID) {
  let project = {};
  let request = {
    projectID: projectID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log(data);

  const response = await instance.post("/viewProject", data);
  console.log("/viewProject");
  console.log(response.data);
  if (response.data.statusCode === 200) {
    project = response.data.body;
  } else {
    alert(response.data.error);
  }
  return project;
}

export async function register(accountType, id, password, name) {
  let request = {
    accountType: accountType,
    name: name,
    ID: id,
    password: password,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log(data);

  const response = await instance.post("/register", data);
  console.log("/register");
  console.log(response.data.body);
  let result = null;
  if (response.data.statusCode === 200) {
    result = "true";
  }
  else {
    result = response.data.error;
  }
  return result;
}

export async function createProject(
  projectName,
  projectType,
  projectStory,
  projectGoal,
  deadline,
  designerID
) {
  let request = {
    designerID: designerID,
    name: projectName,
    type: projectType,
    story: projectStory,
    goal: projectGoal,
    deadline: deadline,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log(data);

  const response = await instance.post("/createProject", data);
  console.log(response.data.body);
  if (response.data.statusCode !== 200) {
    alert(response.data.error);
  }
}

export async function createPledge(projectID, reward, amount, supporterLimit) {
  let request = {
    projectID: projectID,
    reward: reward,
    amount: amount,
    supporterLimit: supporterLimit,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log(data);

  const response = await instance.get("/createPledge");
  console.log(response.data.body);
  if (response.data.statusCode === 200) {
    request = response.data.body;
  } else {
    alert(response.data.error);
  }
  return request;
}
