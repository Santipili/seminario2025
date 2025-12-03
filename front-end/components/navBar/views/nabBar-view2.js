class navBarView2 extends HTMLElement {
  constructor() {
    super();

    this.navBar = document.createElement("div");
    this.navBar.classList.add("nav-bar");

    this.leftContainer = document.createElement("div");
    this.leftContainer.classList.add("left-container");

    this.homeLink = document.createElement("a");
    this.homeLink.classList.add("nav-link");
    this.homeLink.textContent = "Home";
    this.homeLink.href = "/";

    this.rightContainer = document.createElement("div");
    this.rightContainer.classList.add("right-container");

    this.logOutLink = document.createElement("a");
    this.logOutLink.classList.add("nav-link");
    this.logOutLink.textContent = "Log Out";
    this.logOutLink.href = "/logout";

    this.appendChild(this.navBar);
    this.navBar.appendChild(this.leftContainer);
    this.navBar.appendChild(this.rightContainer);
    this.leftContainer.appendChild(this.homeLink);
    this.rightContainer.appendChild(this.logOutLink);
  }
}

customElements.define("navbar-view2", navBarView2);
export { navBarView2 };
