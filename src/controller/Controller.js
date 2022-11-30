import axios from "axios"

const instance = axios.create({
    baseURL: "https://puwud6fni0.execute-api.us-east-1.amazonaws.com/Prod"
  })

export function listDProjects(id) {
    let projects = [];

    let request = {
        "id": id
    }
    let value = JSON.stringify(request);

    let data = { "body" : value }
    
    instance.post("/listDProjects", data)
    .then(function(response) {
        console.log("SDGFJSDNF");
        console.log(response.body);
        projects = response.body;
    })
    .catch(function(error) {
        projects = error.body
    })

    return projects;
}

export function listProjects() {
    let projects = [];

    instance.get("/listProjects")
    .then(function(response) {
        projects = response.body;
    })
    .catch(function(error) {
        projects = error.body
    })
    
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