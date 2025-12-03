class AdminPanelController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    enable() {
        this.model.initFromLocalStorage();
        this.view.setCurrentUserNickname(this.model.currentUserNickname);

        this.view.bindNewUser(() => {
            console.log("Nuevo usuario ");
            window.dispatchEvent(new Event("trigger-create-user"));
        });

        this.view.bindEditGroups(() => {
            window.dispatchEvent(new Event("trigger-groups-edit"));
        });

        this.view.bindDeleteUser(async (userId) => {
            if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
            try {
                const result = await this.model.deleteUser(userId);
                if (!result?.deleted) {
                    alert("No se pudo eliminar el usuario.");
                    return;
                }
                const groups = await this.model.getAvailableGroups();
                this.view.renderUsers(this.model.users, groups);
            } catch (err) {
                console.error("Error eliminando usuario", err);
                alert("Ocurrió un error al eliminar el usuario.");
            }
        });

        this.view.bindGroupChange((data) => {
            // TO DO: guardar cambio de grupo
            console.log("Grupo cambiado (sin guardar aún): ", data);
        });

        this.view.bindSaveGroupChange(async (data, onSuccess) => {
            try {
                await this.model.updateUserGroup(data.userId, data.newGroup);
                onSuccess();
            } catch (err) {
                console.error("Error actualizando grupo", err);
                alert("Ocurrió un error al actualizar el grupo.");
            }
        });

        this.loadAndRender().catch(err => {
            console.error("Error cargando usuarios", err);
        });
    }

    disable() {
        // TODO: revisar si se necesitan remover listeners
    }

    async loadAndRender() {
        const users = await this.model.loadUsers();
        const groups = await this.model.getAvailableGroups();
        this.view.renderUsers(users, groups);
    }
}

export { AdminPanelController };