class AppView extends HTMLElement {
  constructor() {
    super();

    this.div = document.createElement("div");
    this.div.classList.add("app-container");

    // Ranura (slot) para el encabezado
    this.headerSlot = document.createElement("div");
    this.headerSlot.classList.add("header");

    // Ranura (slot) para el contenido
    this.contentSlot = document.createElement("div");
    this.contentSlot.classList.add("content");

    // Ranura (slot) para el pie de página
    this.footerSlot = document.createElement("div");
    this.footerSlot.classList.add("footer");

    this.div.appendChild(this.headerSlot);
    this.div.appendChild(this.contentSlot);
    this.div.appendChild(this.footerSlot);

    this.appendChild(this.div);
  }
}

customElements.define("app-view", AppView);

export { AppView };
