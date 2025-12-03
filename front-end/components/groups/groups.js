import { GroupsView } from "./view/groupsView.js";
import { GroupsModel } from "./model/groupsModel.js";
import { GroupsController } from "./controller/groupsController.js";

class Groups extends HTMLElement {
    constructor() {
        super();
        this.view = new GroupsView();
        this.model = new GroupsModel();
        this.controller = new GroupsController(this.view, this.model);
        let style = document.createElement("style");
        style.innerText = `@import './components/groups/style/style.css'`;
        this.appendChild(style);
        this.appendChild(this.view);
    }

    connectedCallback() {
        this.controller.enable();
    }

    disconnectedCallback() {
        this.controller.disable();
    }
}

customElements.define("x-groups", Groups);

export { Groups };
