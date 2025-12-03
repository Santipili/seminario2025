import { CreateUserView } from "./view/createUserView.js";
import { CreateUserModel } from "./model/createUserModel.js";
import { CreateUserController } from "./controller/createUserController.js";

class CreateUser extends HTMLElement {
    constructor() {
        super();
        this.view = new CreateUserView();
        this.model = new CreateUserModel();
        this.controller = new CreateUserController(this.view, this.model);
        let style = document.createElement("style");
        style.innerText = `@import './components/createUser/style/style.css'`;
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

customElements.define("x-create-user", CreateUser);

export { CreateUser };
