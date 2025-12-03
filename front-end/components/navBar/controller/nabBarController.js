class navBarController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.signUpLink.addEventListener("click", (e) => {
      this.onButtomSignUpClick();
    });

    this.view.logInLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLognInClick(e);
    });

    this.view.homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtonHome();
    });
  }

  disable() {
    this.view.signUpLink.removeEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLogOutClick(e);
    });

    this.view.logInLink.removeEventListener("click", (e) => {
      e.preventDefault();
      tthis.onButtomLognInClick(e);
    });

    this.view.homeLink.removeEventListener("click", (e) => {
      e.preventDefault();
      this.onButtonHome();
    });
  }

  onButtomLognInClick(e) {
    const event = new CustomEvent("trigger-login-instance");
    dispatchEvent(event);
  }

  onButtomSignUpClick() {
    const event = new CustomEvent("trigger-signup-instance");
    dispatchEvent(event);
  }
  onButtonHome() {
    const event = new CustomEvent("home-instance");
    dispatchEvent(event);
  }
}

export { navBarController };
