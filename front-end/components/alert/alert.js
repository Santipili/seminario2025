import { AlertView } from "./view/alertView.js";
import { AlertController } from "./controller/AlertController.js";

class Alert extends HTMLElement {
  constructor() {
    super();

    this.view = new AlertView();
    this.controller = new AlertController(this.view);

    let style = document.createElement("style");
    style.innerText = `@import 'components/alert/style/style.css'`;
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

customElements.define("x-alert", Alert);

export { Alert };
