import { AdminPanelView } from "./view/adminPanelView.js";
import { AdminPanelModel } from "./model/adminPanelModel.js";
import { AdminPanelController } from "./controller/adminPanelController.js";

class AdminPanel extends HTMLElement {
    constructor() {
        super();
        this.view = new AdminPanelView();
        this.model = new AdminPanelModel();
        this.controller = new AdminPanelController(this.view, this.model);
        let style = document.createElement("style");
        style.innerText = `@import './components/panel/adminPanel/style/style.css'`;
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

customElements.define("x-admin-panel", AdminPanel);

export { AdminPanel };
