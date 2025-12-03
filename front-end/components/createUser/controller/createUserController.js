class CreateUserController {
    constructor(viewReference, modelReference) {
        this.view = viewReference;
        this.model = modelReference;

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    enable() {
        this.model.initFromLocalStorage();

        if (this.view.backButton) {
            this.view.backButton.addEventListener("click", this.handleGoBack);
        }

        if (this.view.form) {
            this.view.form.addEventListener("submit", this.handleSubmit);
        }

        this.setGroups();
    }

    disable() {
        if (this.view.backButton) {
            this.view.backButton.removeEventListener("click", this.handleGoBack);
        }

        if (this.view.form) {
            this.view.form.removeEventListener("submit", this.handleSubmit);
        }
    }

    handleGoBack() {
        window.dispatchEvent(new Event("trigger-loggedIn-admin"));
    }

    async handleSubmit(event) {
        event.preventDefault();

        // El controller solo lee la vista y delega al modelo
        const data = {
            nickname: this.view.nicknameInput.value.trim(),
            password: this.view.passwordInput.value,
            repeatPassword: this.view.repeatPasswordInput.value,
            name: this.view.nameInput.value.trim(),
            surname: this.view.surnameInput.value.trim(),
            email: this.view.emailInput.value.trim(),
            phone: this.view.phoneInput.value.trim(),
            group: this.view.groupSelect.value,
        };

        this.view.showMessage("Creando usuario...", "info");

        const result = await this.model.createUser(data);

        if (result.success) {
            this.view.showMessage(result.message, "success");
            this.view.resetForm();
        } else {
            this.view.showMessage(result.message, "error");
        }
    }

    async setGroups() {
        const groups = await this.model.getAvailableGroups();
        this.view.setGroups(groups);
    }
}

export { CreateUserController };