export default class Model {
    constructor(type, id) {
        this.initialize(type, id)
        this.type = type
        this.id = id
    }
    
    initialize(type, id) {
        if (type === "Designer") {
            this.model = new DesignerModel(id);
        }
        else if (type === "Supporter") {
            this.model = new SupporterModel(id);
        }
        else if (type === "Admin") {
            this.model = new AdminModel();
        }
    }
}

export class DesignerModel {
    constructor(id) {
        this.initialize(id)
        this.id = id;
    }

    initialize(id) {
        this.getProjects(id)
    }
}

export class SupporterModel {
    constructor(id) {
        this.initialize(id)
        this.id = id;
    }
    initialize(id) {

    }
}

export class AdminModel {

}