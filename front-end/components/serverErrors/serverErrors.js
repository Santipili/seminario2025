class ServerErrors extends HTMLElement {
  constructor() {
    super();

    // Inicializar el mensaje de error como nulo
    this.errorMessage = null;

    // Crear el shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Crear la estructura interna del componente
    const container = document.createElement("div");
    container.className = "helper";

    this.errorMessageElement = document.createElement("div");
    this.errorMessageElement.classList.add("errorMessageDIV");

    container.appendChild(this.errorMessageElement);

    // Crear el elemento astronaut y sus partes
    const astronaut = document.createElement("div");
    astronaut.dataset.js = "astro";
    astronaut.className = "astronaut";

    const astronautParts = [
      "head",
      "arm arm-left",
      "arm arm-right",
      "body",
      "leg leg-left",
      "leg leg-right",
      "schoolbag",
    ];

    astronautParts.forEach((partClass) => {
      const part = document.createElement("div");
      part.className = partClass;
      astronaut.appendChild(part);
    });

    // Agregar el contenido al shadow DOM
    const style = document.createElement("style");
    style.innerHTML = `@import './components/serverErrors/style/style.css'`;

    shadow.appendChild(style);
    shadow.appendChild(container);
    shadow.appendChild(astronaut);
  }

  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
    this.errorMessageElement.innerText = errorMessage; // Actualizar el texto del error
  }
}

// Registrar el componente personalizado "helper"
customElements.define("helper-component", ServerErrors);

export { ServerErrors };
