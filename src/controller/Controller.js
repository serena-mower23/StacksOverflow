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
  if (response.data.statusCode === 200) {
    console.log(response.data.body);
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
  if (response.data.statusCode === 200) {
    console.log(response.data.body);
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

  const response = await instance.post("/viewProject", data);
  console.log("/viewProject");
  if (response.data.statusCode === 200) {
    console.log(response.data.body);
    project = response.data.body;
  } else {
    alert(response.data.error);
  }
  return project;
}

export async function register(accountType, name, id, password) {
  let request = {
    accountType: accountType,
    name: name,
    ID: id,
    password: password,
  };

  let value = JSON.stringify(request);
  let data = { body: value };

  const response = await instance.post("/register", data);
  console.log("/register");
  let result = null;
  if (response.data.statusCode === 200) {
    result = "true";
  } else {
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
  console.log("/createProject");
  console.log(response.data.body);
  return response;
}

export async function createPledge(projectID, maxSupporters, amount, reward) {
  let checkedReward = "N/A";
  let checkedSupporters = 0;
  if (reward) {
    checkedReward = reward;
  }
  if (maxSupporters) {
    checkedSupporters = maxSupporters;
  }

  let request = {
    projectID: projectID,
    maxSupporters: checkedSupporters,
    pledgeAmount: amount,
    reward: checkedReward,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log(data);

  const response = await instance.post("/createPledge", data);
  console.log("/createPledge");
  console.log(response.data.statusCode);
  let res = null;
  if (response.data.statusCode === 200) {
    res = "true";
  } else {
    res = response.data.error;
  }
  return res;
}

export async function viewTemplates(projectID) {
  let request = {
    projectID: projectID,
  };
  let value = JSON.stringify(request);
  let data = { body: value };

  const response = await instance.post("/viewTemplates", data);
  console.log("/viewTemplates");
  let res = null;
  if (response.data.statusCode === 200) {
    res = response.data.body;
  } else {
    res = response.data.error;
  }
  return res;
}

export async function viewTransactions(projectID) {
  let request = {
    projectID: projectID,
  };
  let value = JSON.stringify(request);
  let data = { body: value };
  const response = await instance.post("/viewTransactions", data);
  console.log("/viewTransactions");
  let res = null;
  if (response.data.statusCode === 200) {
    console.log(response.data.body);
    res = response.data.body;
  } else {
    res = response.data.error;
  }
  return res;
}
