import axios from "axios";

const instance = axios.create({
  baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod",
});
const options = [
  { value: "game", label: "Game" },
  { value: "movie", label: "Movie" },
  { value: "toy", label: "Toy" },
  { value: "music", label: "Music" },
  { value: "tech", label: "Tech" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food" },
  { value: "art", label: "Art" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

export async function listDesignerProjects(id) {
  let projects = [];

  let request = {
    designerID: id,
  };
  let value = JSON.stringify(request);

  let data = { body: value };

  console.log("/listDesignerProjects");
  const response = await instance.post("/listDesignerProjects", data);

  if (response.data.statusCode === 200) {
    projects = response.data.body;
  } else {
    alert(response.data.error);
  }
  return projects;
}

export async function viewSupporterTransactions(supporterID) {
  let pledges = [];

  let request = {
    supporterID: supporterID,
  };
  let value = JSON.stringify(request);

  let data = { body: value };
  console.log("/viewSupporterTransactions");
  const response = await instance.post("/viewSupporterTransactions", data);

  if (response.data.statusCode === 200) {
    pledges = response.data.body;
  } else {
    alert("response.data.error");
  }
  return pledges;
}

export async function listProjects() {
  let projects = [];
  const response = await instance.get("/listProjects");
  console.log("/listProjects");
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

  const response = await instance.post("/viewProject", data);
  console.log("/viewProject");
  if (response.data.statusCode === 200) {
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

  const response = await instance.post("/createProject", data);
  console.log("/createProject");
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

  console.log("/createPledge");
  const response = await instance.post("/createPledge", data);

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

  console.log("/viewTemplates");
  const response = await instance.post("/viewTemplates", data);

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

  console.log("/viewTransactions");
  const response = await instance.post("/viewTransactions", data);

  let res = null;
  if (response.data.statusCode === 200) {
    res = response.data.body;
  } else {
    res = response.data.error;
  }
  return res;
}

export async function getFunds(supporterID) {
  let request = {
    supporterID: supporterID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log("/getFunds");
  const response = await instance.post("/getFund", data);

  if (response.data.statusCode === 200) {
    return response.data.body;
  } else {
    return "error";
  }
}

export async function updateFunds(supporterID, amount) {
  let request = {
    supporterID: supporterID,
    fund: amount,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log("/addFunds");
  const response = await instance.post("/addFund", data);
  if (response.data.statusCode === 200) {
    return "true";
  } else {
    return response.data.error;
  }
}

export async function deleteProject(projectID) {
  let request = {
    projectID: projectID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log("/deleteProject");
  const response = await instance.post("/deleteProject", data);

  let res = null;
  if (response.data.statusCode === 200) {
    res = "true";
  } else {
    res = response.data.error;
  }
  return res;
}

export async function launchProject(projectID) {
  let request = {
    projectID: projectID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log("/launchProject");
  const response = await instance.post("/launchProject", data);

  let res = null;
  if (response.data.statusCode === 200) {
    res = "true";
  } else {
    res = response.data.error;
  }
  return res;
}

export async function deletePledge(templateID) {
  let request = {
    templateID: templateID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log("/deletePledge");
  const response = await instance.post("/deletePledge", data);

  let res = null;
  if (response.data.statusCode === 200) {
    res = "true";
  } else {
    res = response.data.error;
  }
  return res;
}

export async function searchProjects(search) {}

export async function createTransaction(
  projectID,
  templateID,
  supporterID,
  amount
) {
  let request = {
    projectID: projectID,
    templateID: templateID,
    supporterID: supporterID,
    amount: amount,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log("/createTransaction");
  const response = await instance.post("/createTransaction", data);
  let res = null;
  if (response.data.statusCode === 200) {
    res = "true";
  } else {
    res = response.data.error;
  }
  return res;
}

export async function viewSupporterTemplate(templateID) {
  let request = {
    templateID: templateID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };
  console.log("/viewTemplateSupporter");
  const response = await instance.post("/viewTemplateSupporter", data);

  let res = null;
  if (response.data.statusCode === 200) {
    res = response.data.body;
  } else {
    res = response.data.error;
  }
  return res;
}

export async function login(accountType, username, password) {
  let request = {
    accountType: accountType,
    email: username,
    password: password,
  };
  let value = JSON.stringify(request);

  let data = { body: value };

  console.log("/login");
  const response = await instance.post("/login", data);
  let res = null;
  if (response.data.statusCode === 200) {
    res = "true";
  } else {
    res = response.data.error;
  }
  return res;
}

export async function getDesignerInfo(designerID) {
  let request = {
    designerID: designerID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };

  console.log("/getDesignerInfo");
  const response = await instance.post("/getDesignerInformation", data);
  let res = null;
  if (response.data.statusCode === 200) {
    res = response.data.body;
  } else {
    res = response.data.error;
  }
  return res;
}

export async function getSupporterInfo(supporterID) {
  let request = {
    supporterID: supporterID,
  };

  let value = JSON.stringify(request);
  let data = { body: value };

  console.log("/getSupporterInfo");
  const response = await instance.post("/getSupporterInformation", data);
  let res = null;
  if (response.data.statusCode === 200) {
    res = response.data.body;
  } else {
    res = response.data.error;
  }
  return res;
}

export async function getSortedProjects() {
  console.log("/sortProjects");
  const response = await instance.post("/sortProjects");
  let res = null;
  if (response.data.statusCode === 200) {
    res = response.data.body;
  } else {
    res = response.data.error;
  }
  return res;
}
