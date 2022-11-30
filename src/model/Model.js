export default class Model {
    constructor(type, projects, id="noId") {
        this.initialize(type, projects, id)
        this.type = type
        this.projects = projects
        this.id = id
    }
    
    initialize(type, projects, id) {
        if (type === "Designer") {
            this.model = new DesignerModel(id, projects);
        }
        // else if (type === "Supporter") {
        //     this.model = new SupporterModel(id, projects);
        // }
        else if (type === "Admin") {
            this.model = new AdminModel(projects);
        }
    }
}

export class DesignerModel {
    constructor(id, projects) {
        this.id = id;
        this.projects = []

        for (let i = 0; i < projects.length; i++ ) {
            this.projects[i] = new Project(projects[i].ProjectID, projects[i].ProjectName, projects[i].ProjectStory, projects[i].ProjectType, projects[i].Deadline, projects[i].ProjectGoal, projects[i].DesignerID, projects[i].IsLaunched, projects[i].MoneyRaised, projects[i].NumSupporters)
        }
    }
}

// export class SupporterModel {
//     constructor(id, projects) {
//         this.id = id;      
//     }
    
//     initialize(id, projects) {

//     }
// }

export class AdminModel {
    constructor(projects) {
        this.projects = [];
        for (let i = 0; i < projects.length; i++ ) {
            this.projects[i] = new Project(projects[i].ProjectID, projects[i].ProjectName, projects[i].ProjectStory, projects[i].ProjectType, projects[i].Deadline, projects[i].ProjectGoal, projects[i].DesignerID, projects[i].IsLaunched, projects[i].MoneyRaised, projects[i].NumSupporters)
        }
    }
}

export class Project {
    constructor(projectID, projectName, projectStory, projectType, projectDeadline, projectGoal, designerID, isLaunched, moneyRaised, numSupporters) {
        this.projectID = projectID;
        this.projectName = projectName;
        this.projectStory = projectStory;
        this.projectType = projectType;
        this.projectDeadline = projectDeadline;
        this.projectGoal = projectGoal;
        this.designerID = designerID;
        this.isLaunched = isLaunched;
        this.moneyRaised = moneyRaised;
        this.numSupporters = numSupporters;
    }
}