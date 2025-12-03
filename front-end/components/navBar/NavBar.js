import { navBarView } from "./views/nabBar-view.js";
import { navBarModel } from "./model/navBarModel.js";
import { navBarController } from "./controller/nabBarController.js";

class navBar extends HTMLElement {
  constructor(
    innerview = navBarView,
    innerController = navBarController,
    innerModel = navBarModel
  ) {
    super();

    this.view = new innerview();
    this.model = new innerModel();
    this.controller = new innerController(this.view, this.model);
    let style = document.createElement("style");
    style.innerText = `@import './components/navBar/style/style.css'`;
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

customElements.define("x-navbar", navBar);

export { navBar };
