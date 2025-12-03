class AlertView extends HTMLElement {
  constructor() {
    super();

    this.classList.add("info");

    this.iconDiv = document.createElement("div");
    this.iconDiv.classList.add("info__icon");

    this.svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.svgIcon.setAttribute("width", "24");
    this.svgIcon.setAttribute("viewBox", "0 0 24 24");
    this.svgIcon.setAttribute("height", "24");
    this.svgIcon.setAttribute("fill", "none");

    this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path.setAttribute("fill", "#393a37");
    this.path.setAttribute(
      "d",
      "M12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215-.49305.3215-.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
    );

    this.titleDiv = document.createElement("div");
    this.titleDiv.classList.add("info__title");
    this.titleDiv.textContent = "";

    this.closeDiv = document.createElement("div");
    this.closeDiv.classList.add("info__close");

    this.exitBtn = document.createElement("button");
    this.exitBtn.className = "info__close";
    this.exitBtn.textContent = "×";

    this.svgIcon.appendChild(this.path);
    this.iconDiv.appendChild(this.svgIcon);

    this.closeDiv.appendChild(this.exitBtn);

    this.appendChild(this.iconDiv);
    this.appendChild(this.titleDiv);
    this.appendChild(this.closeDiv);
  }
}

customElements.define("alert-view", AlertView);

export { AlertView };
