import { AppView } from "./view/appView.js";
import { navBar } from "../components/navBar/NavBar.js";
import { navBarView2 } from "../components/navBar/views/nabBar-view2.js";
import { navBarModel2 } from "../components/navBar/model/navBarModel2.js";
import { navBarController2 } from "../components/navBar/controller/nabBarController2.js";
import { LoginForm } from "../components/loginform/LoginForm.js";
import { SignUp } from "../components/signUP/SignUp.js";
import { Alert } from "../components/alert/alert.js";
import { ServerErrors } from "../components/serverErrors/serverErrors.js";
import { AdminPanel } from "../components/panel/adminPanel/adminPanel.js";
import { Groups } from "../components/groups/groups.js";
import { CreateUser } from "../components/createUser/createUser.js";

class Application extends HTMLElement {
  constructor() {
    super();
    this.view = new AppView();
    ////////////////////////////////
    this.nv = new navBar();
    this.nv2 = new navBar(navBarView2, navBarController2, navBarModel2);
    this.loginForm = new LoginForm();
    this.signUp = new SignUp();
    this.alert = new Alert();
    this.error = new ServerErrors();
    this.adminsession = new AdminPanel();
    this.groupsedit = new Groups();
    this.createuser = new CreateUser();

    this.currentState = null;

    let style = document.createElement("style");
    style.innerText = `@import './app/style/style.css'`;
    this.appendChild(this.view);
    this.appendChild(style);
  }

  changeState(newState) {
    if (this.currentState) {
      this.currentState.remove();
    }

    this.currentState = newState;
    this.view.contentSlot.appendChild(this.currentState);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.view.headerSlot.appendChild(this.nv);
    this.changeState(this.loginForm);
  }

  setupEventListeners() {
    window.addEventListener("exit-verify", () => {
      this.changeState(null);
    });

    window.addEventListener("trigger-login-instance", () => {
      this.changeState(this.loginForm);
    });

    window.addEventListener("trigger-signup-instance", () => {
      this.changeState(this.signUp);
    });

    window.addEventListener("trigger-logout-instance", () => {
      this.view.headerSlot.removeChild(this.nv2);
      this.view.headerSlot.appendChild(this.nv);
      this.changeState(this.loginForm);
    });
    window.addEventListener("trigger-alert-instance", (e) => {
      this.alert.controller.showMessage(e.detail);
      this.view.footerSlot.appendChild(this.alert);
    });
    window.addEventListener("trigger-delete-alert-instance", (e) => {
      this.view.footerSlot.removeChild(this.alert);
    });

    window.addEventListener("home-instance", () => {
      this.view.headerSlot.appendChild(this.nv);
      this.changeState(this.loginForm);
    });

    window.addEventListener("trigger-loggedIn-admin", () => {
      this.view.headerSlot.innerHTML = "";
      this.changeState(this.adminsession);
    });
    window.addEventListener("trigger-loggedIn", () => {
      this.view.headerSlot.innerHTML = "";
      this.changeState(this.adminsession);
    });

    window.addEventListener("trigger-groups-edit", () => {
      this.changeState(this.groupsedit);
    });
    window.addEventListener("trigger-create-user", () => {
      this.changeState(this.createuser);
    });
  }
}

customElements.define("x-application", Application);

export { Application };
