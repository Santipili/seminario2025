import { LoginFormView } from "./views/Login-view.js";
import { LoginFormModel } from "./model/LoginFormModel.js";
import { LoginFormController } from "./controller/LoginFormController.js";

class LoginForm extends HTMLElement {
  constructor() {
    super();

    this.view = new LoginFormView();
    this.model = new LoginFormModel();
    this.controller = new LoginFormController(this.view, this.model);
    let style = document.createElement("style");
    style.innerText = `@import './components/loginform/style/style.css'`;
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

customElements.define("x-loginform", LoginForm);

export { LoginForm };
