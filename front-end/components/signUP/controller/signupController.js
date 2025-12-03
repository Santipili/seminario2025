class SignupController {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }
  enable() {
    this.view.buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomSignUpClick();
    });
  }
  disable() {
    this.view.buttonSubmit = null;
  }

  async onButtomSignUpClick() {
    if (this.view.inputPassw.value == this.view.inputCheckPassw.value) {
      let DATA = {
        userName: this.view.inputUserName.value,
        email: this.view.inputEmail.value,
        name: this.view.inputName.value,
        surname: this.view.inputSurname.value,
        password: this.view.inputPassw.value,
      };

      let res = await this.model.signUp(DATA);

      if (res) {
        window.dispatchEvent(
          new CustomEvent("trigger-alert-instance", { detail: res.message })
        );
        window.dispatchEvent(new CustomEvent("trigger-login-instance"));
      }
    } else {
      alert("error the password must be the same");
    }
  }
}

export { SignupController };
