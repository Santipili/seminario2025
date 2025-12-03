import { Application } from "./app/aplication.js";

function main() {
  let app = new Application();
  document.body.appendChild(app);
}

window.addEventListener("load", main);
