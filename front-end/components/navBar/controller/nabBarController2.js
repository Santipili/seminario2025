class navBarController2 {
  constructor(viewReference, modelReference) {
    this.view = viewReference;
    this.model = modelReference;
  }

  enable() {
    this.view.logOutLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLogOutClick(e);
    });
  }

  disable() {
    this.view.logOutLink.removeEventListener("click", (e) => {
      e.preventDefault();
      this.onButtomLogOutClick(e);
    });
  }

  async onButtomLogOutClick(e) {
    let res = await this.model.logout();
    console.log(res);
    if (res) {
      window.dispatchEvent(
        new CustomEvent("trigger-alert-instance", { detail: res.message })
      );
      window.dispatchEvent(new Event("trigger-logout-instance"));
    } else {
      window.dispatchEvent(
        new CustomEvent("trigger-alert-instance", { detail: res.message })
      );
    }
  }
}

export { navBarController2 };
