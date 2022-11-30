import axios from "axios"

const instance = axios.create({
    baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod"
  })

export async function listDProjects(id) {
    let projects = [];

    let request = {
        "id": id
    }
    let value = JSON.stringify(request);

    let data = { "body" : value }
    
    const response = await instance.post("/listDProjects", data)
    console.log(response.data);
    if (response.data.statusCode === 200) {
        projects = response.data;
    }
    else {
        alert(response.data.error);
    }
    return projects;
}

export async function listProjects() {
    let projects = [];
    console.log("SHE DOESNT EVEN GO HERE");
    const response = await instance.get("/listProjects");    
    console.log(response.data.body);
    if (response.data.statusCode === 200) {
        projects = response.data.body;
    }
    else {
        alert(response.data.error);
    }
    return projects;
  }
  
  export async function createProject() { 
    let request = {
        "projectName": projectName,
        "projectType": projectType,
        "projectStory": projectStory,
        "projectGoal": projectGoal,
        "deadline": deadline,
        "designerID": designerID
      }

    let value = JSON.stringify(request)
    let data = { "body" : value }
    console.log(data);

    instance.post("/createProject", data)
    .then(function(response) {
        console.log(response.body);
        request = response.body;
    })
    .catch(function(error) {
        request = error.body
    })
  }