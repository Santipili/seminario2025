class CreateUserView extends HTMLElement {
    constructor() {
        super();

        this.container = document.createElement("div");
        this.container.classList.add("create-user");

        // Header (flecha atrás + título)
        this.header = document.createElement("div");
        this.header.classList.add("create-user__header");

        this.backButton = document.createElement("button");
        this.backButton.classList.add("create-user__back-button");
        this.backButton.setAttribute("title", "Volver");
        this.backButton.textContent = "←";

        this.titleLabel = document.createElement("h2");
        this.titleLabel.classList.add("create-user__title");
        this.titleLabel.textContent = "Crear usuario";

        this.header.appendChild(this.backButton);
        this.header.appendChild(this.titleLabel);

        // Formulario
        this.form = document.createElement("form");
        this.form.classList.add("create-user__form");

        // Helper para crear campos
        const createField = (labelText, inputType, inputName) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("create-user__field");

            const label = document.createElement("label");
            label.classList.add("create-user__label");
            label.textContent = labelText;
            label.htmlFor = inputName;

            const input = document.createElement("input");
            input.classList.add("create-user__input");
            input.type = inputType;
            input.name = inputName;
            input.id = inputName;

            wrapper.appendChild(label);
            wrapper.appendChild(input);

            return { wrapper, input };
        };

        const nicknameField = createField("Nickname", "text", "nickname");
        this.nicknameInput = nicknameField.input;
        this.form.appendChild(nicknameField.wrapper);

        const passwordField = createField("Password", "password", "password");
        this.passwordInput = passwordField.input;
        this.form.appendChild(passwordField.wrapper);

        const repeatPasswordField = createField("Repetir password", "password", "repeatPassword");
        this.repeatPasswordInput = repeatPasswordField.input;
        this.form.appendChild(repeatPasswordField.wrapper);

        const nameField = createField("Nombre", "text", "name");
        this.nameInput = nameField.input;
        this.form.appendChild(nameField.wrapper);

        const surnameField = createField("Apellido", "text", "surname");
        this.surnameInput = surnameField.input;
        this.form.appendChild(surnameField.wrapper);

        const emailField = createField("Email", "email", "email");
        this.emailInput = emailField.input;
        this.form.appendChild(emailField.wrapper);

        const phoneField = createField("Teléfono", "tel", "phone");
        this.phoneInput = phoneField.input;
        this.form.appendChild(phoneField.wrapper);

        const groupWrapper = document.createElement("div");
        groupWrapper.classList.add("create-user__field");

        const groupLabel = document.createElement("label");
        groupLabel.classList.add("create-user__label");
        groupLabel.textContent = "Grupo";
        groupLabel.htmlFor = "group";

        this.groupSelect = document.createElement("select");
        this.groupSelect.classList.add("create-user__select");
        this.groupSelect.name = "group";
        this.groupSelect.id = "group";

        const defaultOpt = document.createElement("option");
        defaultOpt.value = "";
        defaultOpt.textContent = "Seleccione un grupo";
        this.groupSelect.appendChild(defaultOpt);

        groupWrapper.appendChild(groupLabel);
        groupWrapper.appendChild(this.groupSelect);
        this.form.appendChild(groupWrapper);

        // Mensaje de error/info
        this.messageBox = document.createElement("div");
        this.messageBox.classList.add("create-user__message");
        this.messageBox.style.display = "none";

        // Botón submit (debajo de todo)
        this.submitButton = document.createElement("button");
        this.submitButton.classList.add("create-user__submit");
        this.submitButton.type = "submit";
        this.submitButton.textContent = "Crear usuario";

        this.form.appendChild(this.submitButton);

        // Armado final
        this.container.appendChild(this.header);
        this.container.appendChild(this.form);
        this.container.appendChild(this.messageBox);

        this.appendChild(this.container);
    }

    setGroups(groups) {
        // Limpia opciones (dejando la primera)
        this.groupSelect.innerHTML = "";
        const defaultOpt = document.createElement("option");
        defaultOpt.value = "";
        defaultOpt.textContent = "Seleccione un grupo";
        this.groupSelect.appendChild(defaultOpt);

        if (!Array.isArray(groups)) return;

        groups.forEach((g) => {
            const opt = document.createElement("option");
            opt.value = g.id;          // o g.name según tu API
            opt.textContent = g.name;
            this.groupSelect.appendChild(opt);
        });
    }

    showMessage(text, type = "info") {
        this.messageBox.textContent = text;
        this.messageBox.dataset.type = type; // para estilos por tipo
        this.messageBox.style.display = text ? "block" : "none";
    }

    resetForm() {
        this.form.reset();
    }
}

customElements.define("x-create-user-view", CreateUserView);

export { CreateUserView };