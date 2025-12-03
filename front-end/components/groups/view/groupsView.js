class GroupsView extends HTMLElement {
    constructor() {
        super();

        this.groupsPanel = document.createElement("div");
        this.groupsPanel.classList.add("groups-panel");

        this.header = document.createElement("div");
        this.header.classList.add("groups-panel__header");

        this.backButton = document.createElement("button");
        this.backButton.classList.add("groups-panel__back-button");
        this.backButton.setAttribute("title", "Volver");
        this.backButton.textContent = "←";

        this.titleLabel = document.createElement("h2");
        this.titleLabel.classList.add("groups-panel__title");
        this.titleLabel.textContent = "Editar grupos";

        this.header.appendChild(this.backButton);
        this.header.appendChild(this.titleLabel);

        this.toolbar = document.createElement("div");
        this.toolbar.classList.add("groups-panel__toolbar");

        this.tableContainer = document.createElement("div");
        this.tableContainer.classList.add("groups-panel__table-container");

        this.table = document.createElement("table");
        this.table.classList.add("groups-table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = ["Nombre", "Acciones"];
        headers.forEach(h => {
            const th = document.createElement("th");
            th.textContent = h;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        this.tableBody = document.createElement("tbody");

        this.table.appendChild(thead);
        this.table.appendChild(this.tableBody);
        this.tableContainer.appendChild(this.table);

        this.groupsPanel.appendChild(this.header);
        this.groupsPanel.appendChild(this.toolbar);
        this.groupsPanel.appendChild(this.tableContainer);

        this.appendChild(this.groupsPanel);

        this.onEditGroup = null;
        this.onDeleteGroup = null;
        this.onSaveEdit = null;
        this.onCancelEdit = null;
        this.onGoBack = null;

        this.tableBody.addEventListener("click", (e) => {
            const button = e.target.closest("button");
            if (!button) return;

            const action = button.dataset.action;
            const row = button.closest("tr");
            if (!row) return;

            const groupId = row.dataset.id;
            if (!groupId) return;

            switch (action) {
                case "edit":
                    if (this.onEditGroup) this.onEditGroup(groupId);
                    break;
                case "delete":
                    if (this.onDeleteGroup) this.onDeleteGroup(groupId);
                    break;
                case "save":
                    if (this.onSaveEdit) this.onSaveEdit(groupId);
                    break;
                case "cancel":
                    if (this.onCancelEdit) this.onCancelEdit(groupId);
                    break;
            }
        });
    }

    /**
     * @param {Array<{id: number, name: string}>} groups
     */
    renderGroups(groups) {
        this.tableBody.innerHTML = "";

        groups.forEach(group => {
            const tr = document.createElement("tr");
            tr.dataset.id = group.id;

            const tdName = document.createElement("td");
            tdName.classList.add("group-name-cell");
            tdName.textContent = group.name;

            const tdActions = document.createElement("td");


            if (group.name !== "ADMIN") {
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Borrar";
                deleteBtn.classList.add("btn-delete");
                deleteBtn.dataset.action = "delete";
                tdActions.appendChild(deleteBtn);

                const editBtn = document.createElement("button");
                editBtn.textContent = "Editar";
                editBtn.classList.add("btn-edit");
                editBtn.dataset.action = "edit";
                tdActions.appendChild(editBtn);
            } else {
                const span = document.createElement("span");
                span.textContent = "No editable";
                span.classList.add("not-editable-label");
                tdActions.appendChild(span);
            }

            tr.appendChild(tdName);
            tr.appendChild(tdActions);
            this.tableBody.appendChild(tr);
        });
    }

    startEditingRow(groupId, currentName) {
        const row = this.tableBody.querySelector(`tr[data-id="${groupId}"]`);
        if (!row) return;

        const nameCell = row.querySelector(".group-name-cell");
        const actionsCell = row.children[1];

        nameCell.innerHTML = "";
        const input = document.createElement("input");
        input.type = "text";
        input.name = "groupName";
        input.value = currentName;
        nameCell.appendChild(input);

        actionsCell.innerHTML = "";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Guardar";
        saveBtn.classList.add("btn-save");
        saveBtn.dataset.action = "save";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancelar";
        cancelBtn.classList.add("btn-cancel");
        cancelBtn.dataset.action = "cancel";

        actionsCell.appendChild(saveBtn);
        actionsCell.appendChild(cancelBtn);
    }

    getEditedName(groupId) {
        const row = this.tableBody.querySelector(`tr[data-id="${groupId}"]`);
        if (!row) return "";

        const input = row.querySelector('input[name="groupName"]');
        return input ? input.value.trim() : "";
    }

    resetRow(groupId, name, isAdmin) {
        const row = this.tableBody.querySelector(`tr[data-id="${groupId}"]`);
        if (!row) return;

        const nameCell = row.querySelector(".group-name-cell");
        const actionsCell = row.children[1];

        nameCell.innerHTML = "";
        nameCell.textContent = name;

        actionsCell.innerHTML = "";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Borrar";
        deleteBtn.classList.add("btn-delete");
        deleteBtn.dataset.action = "delete";
        actionsCell.appendChild(deleteBtn);

        if (!isAdmin) {
            const editBtn = document.createElement("button");
            editBtn.textContent = "Editar";
            editBtn.classList.add("btn-edit");
            editBtn.dataset.action = "edit";
            actionsCell.appendChild(editBtn);
        } else {
            const span = document.createElement("span");
            span.textContent = "No editable";
            span.classList.add("not-editable-label");
            actionsCell.appendChild(span);
        }
    }

    showError(message) {
        alert(message);
    }

    showConfirmation(message) {
        return confirm(message);
    }

    bindEditGroup(handler) {
        this.onEditGroup = handler;
    }

    bindDeleteGroup(handler) {
        this.onDeleteGroup = handler;
    }

    bindSaveEdit(handler) {
        this.onSaveEdit = handler;
    }

    bindCancelEdit(handler) {
        this.onCancelEdit = handler;
    }

    bindGoBack(handler) {
        this.onGoBack = handler;
        this.backButton.onclick = handler
            ? () => handler()
            : null;
    }
}

customElements.define("x-groups-view", GroupsView);
export { GroupsView };
