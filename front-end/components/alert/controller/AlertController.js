class AlertController {
  constructor(viewReference) {
    this.view = viewReference;
  }

  enable() {
    this.view.exitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomExitClick();
    });
  }

  disable() {}

  onButtomExitClick() {
    window.dispatchEvent(new CustomEvent("trigger-delete-alert-instance"));
  }

  showMessage(message) {
    this.view.titleDiv.textContent = message;
  }
}

export { AlertController };
