class AdminPanelView extends HTMLElement {
    constructor() {
        super();

        this.adminPanel = document.createElement("div");
        this.adminPanel.classList.add("admin-panel");

        this.header = document.createElement("div");
        this.header.classList.add("admin-panel__header");

        this.userNameLabel = document.createElement("div");
        this.userNameLabel.classList.add("admin-panel__user-name");
        this.userNameLabel.textContent = "Usuario";

        //TODO:  Deberia ser un componente en si el boton para manejarllo mas facil
        this.newUserButton = document.createElement("button");
        this.newUserButton.classList.add("btn", "btn--primary");
        this.newUserButton.innerHTML = `<span class="btn__icon">+</span><span>Nuevo usuario</span>`;

        this.header.appendChild(this.userNameLabel);
        this.header.appendChild(this.newUserButton);

        this.toolbar = document.createElement("div");
        this.toolbar.classList.add("admin-panel__toolbar");

        this.editGroupsButton = document.createElement("button");
        this.editGroupsButton.classList.add("btn", "btn--secondary");
        this.editGroupsButton.textContent = "Editar grupos";

        this.toolbar.appendChild(this.editGroupsButton);

        this.tableContainer = document.createElement("div");
        this.tableContainer.classList.add("admin-panel__table-container");

        this.table = document.createElement("table");
        this.table.classList.add("admin-panel__table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = ["Nombre", "Apellido", "DNI", "Email", "Grupo", "Acciones"];
        headers.forEach(h => {
            const th = document.createElement("th");
            th.textContent = h;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        this.tbody = document.createElement("tbody");

        this.table.appendChild(thead);
        this.table.appendChild(this.tbody);
        this.tableContainer.appendChild(this.table);

        this.adminPanel.appendChild(this.header);
        this.adminPanel.appendChild(this.toolbar);
        this.adminPanel.appendChild(this.tableContainer);

        this.appendChild(this.adminPanel);

        // Handlers registrados por el controller
        this.onDeleteUser = null;
        this.onGroupChange = null;
        this.onSaveGroupChange = null;
        this.onNewUser = null;
        this.onEditGroups = null;
    }

    setCurrentUserNickname(nickname) {
        this.userNameLabel.textContent = nickname || "Usuario";
    }

    /**
     * Renderiza la tabla de usuarios.
     * @param {Array} users
     * @param {Array<string>} groups
     */
    renderUsers(users, groups) {
        this.tbody.innerHTML = "";

        users.forEach(user => {
            const tr = document.createElement("tr");
            tr.dataset.userId = user.id;

            const tdName = document.createElement("td");
            tdName.textContent = user.name || "";
            tr.appendChild(tdName);

            const tdSurname = document.createElement("td");
            tdSurname.textContent = user.surname || "";
            tr.appendChild(tdSurname);

            const tdDni = document.createElement("td");
            tdDni.textContent = user.dni || "";
            tr.appendChild(tdDni);

            const tdEmail = document.createElement("td");
            tdEmail.textContent = user.email || "";
            tr.appendChild(tdEmail);

            const tdGroup = document.createElement("td");
            tdGroup.classList.add("admin-panel__cell-group");

            const groupLabel = document.createElement("span");
            groupLabel.classList.add("group-label");
            const originalGroup = user.group || "";
            groupLabel.textContent = originalGroup || "Sin grupo";

            const select = document.createElement("select");
            select.classList.add("group-select");
            select.style.display = "none";

            // Opción vacía si querés permitir "sin grupo"
            // const emptyOpt = document.createElement("option");
            // emptyOpt.value = "";
            // emptyOpt.textContent = "Sin grupo";
            // select.appendChild(emptyOpt);

            groups.forEach(g => {
                const opt = document.createElement("option");
                opt.value = g.id;
                opt.textContent = g.name;
                select.appendChild(opt);
            });

            select.value = originalGroup || "";

            tdGroup.appendChild(groupLabel);
            tdGroup.appendChild(select);
            tr.appendChild(tdGroup);

            const tdActions = document.createElement("td");
            tdActions.classList.add("admin-panel__cell-actions");

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("icon-button", "icon-button--danger");
            deleteBtn.setAttribute("title", "Eliminar usuario");
            deleteBtn.innerHTML = "🗑️";

            const saveBtn = document.createElement("button");
            saveBtn.classList.add("btn", "btn--small", "btn--success", "row-save-button");
            saveBtn.textContent = "Guardar";
            saveBtn.style.display = "none";

            tdActions.appendChild(deleteBtn);
            tdActions.appendChild(saveBtn);

            tr.appendChild(tdActions);

            tdGroup.addEventListener("click", (e) => {
                // No reabrir si el click vino del select 
                if (e.target === select) return;

                groupLabel.style.display = "none";
                select.style.display = "inline-block";
                select.focus();
            });

            select.addEventListener("change", () => {
                const newGroup = select.value;
                const changed = newGroup !== originalGroup;

                saveBtn.style.display = changed ? "inline-flex" : "none";

                if (this.onGroupChange) {
                    this.onGroupChange({
                        userId: user.id,
                        newGroup,
                        originalGroup
                    });
                }
            });

            saveBtn.addEventListener("click", () => {
                const newGroup = select.value;
                if (!this.onSaveGroupChange) return;

                this.onSaveGroupChange(
                    {
                        userId: user.id,
                        newGroup,
                        originalGroup
                    },
                    () => {
                        groupLabel.textContent = newGroup || "Sin grupo";
                        groupLabel.style.display = "inline";
                        select.style.display = "none";
                        saveBtn.style.display = "none";
                    }
                );
            });

            deleteBtn.addEventListener("click", () => {
                if (this.onDeleteUser) {
                    // console.log("Delete user clicked for user id:", user.id);
                    this.onDeleteUser(user.id);
                }
            });

            this.tbody.appendChild(tr);
        });
    }

    bindNewUser(handler) {
        this.onNewUser = handler;
        this.newUserButton.addEventListener("click", () => {
            if (this.onNewUser) this.onNewUser();
        });
    }

    bindEditGroups(handler) {
        this.onEditGroups = handler;
        this.editGroupsButton.addEventListener("click", () => {
            if (this.onEditGroups) this.onEditGroups();
        });
    }

    bindDeleteUser(handler) {
        this.onDeleteUser = handler;
    }

    bindGroupChange(handler) {
        this.onGroupChange = handler;
    }

    bindSaveGroupChange(handler) {
        this.onSaveGroupChange = handler;
    }
}

customElements.define("x-admin-panel-view", AdminPanelView);
export { AdminPanelView };