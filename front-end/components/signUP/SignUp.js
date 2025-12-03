import { SignUpView } from "./view/signupView.js";
import { SignupController } from "./controller/signupController.js";
import { SignUpModel } from "./model/signUpModel.js";

class SignUp extends HTMLElement {
  constructor() {
    super();
    this.view = new SignUpView();
    this.model = new SignUpModel();
    this.controller = new SignupController(this.view, this.model);
    let style = document.createElement("style");
    style.innerText = `@import 'components/signUP/style/style.css'`;
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

customElements.define("x-signup", SignUp);

export { SignUp };
