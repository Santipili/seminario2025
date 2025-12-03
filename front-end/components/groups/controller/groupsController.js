class GroupsController {
    constructor(viewReference, modelReference) {
        this.view = viewReference;
        this.model = modelReference;
    }

    async enable() {
        this.model.initFromLocalStorage();
        this.view.bindEditGroup((groupId) => this.onEditGroup(groupId));
        this.view.bindDeleteGroup((groupId) => this.onDeleteGroup(groupId));
        this.view.bindSaveEdit((groupId) => this.onSaveGroup(groupId));
        this.view.bindCancelEdit((groupId) => this.onCancelEdit(groupId));
        this.view.bindGoBack(() => this.onGoBack());
        this.view.bindSaveNewGroup((groupName) => this.onSaveNewGroup(groupName));

        await this.loadGroups();
    }

    disable() {
        this.view.bindEditGroup(null);
        this.view.bindDeleteGroup(null);
        this.view.bindSaveEdit(null);
        this.view.bindCancelEdit(null);
        this.view.bindGoBack(null);
        this.view.bindSaveNewGroup(null);
    }

    async loadGroups() {
        try {
            const groups = await this.model.fetchGroups();
            this.view.renderGroups(groups);
        } catch (error) {
            console.error('Error cargando grupos', error);
            this.view.showError('Ocurrió un error al cargar los grupos.');
        }
    }

    onEditGroup(groupId) {
        const group = this.model.groups.find(g => String(g.id) === String(groupId));
        if (!group) return;

        if (group.name === 'ADMIN') {
            this.view.showError('El grupo ADMIN no puede ser editado.');
            return;
        }

        this.view.startEditingRow(groupId, group.name);
    }

    async onDeleteGroup(groupId) {
        const group = this.model.groups.find(g => String(g.id) === String(groupId));
        if (!group) return;

        const confirmed = this.view.showConfirmation(
            `¿Seguro que deseas borrar el grupo "${group.name}"?`
        );
        if (!confirmed) return;

        try {
            await this.model.deleteGroup(groupId);
            this.model.groups = this.model.groups.filter(g => String(g.id) !== String(groupId));
            this.view.renderGroups(this.model.groups);
        } catch (error) {
            console.error('Error borrando grupo', error);
            this.view.showError('Ocurrió un error al borrar el grupo.');
        }
    }

    async onSaveGroup(groupId) {
        const group = this.model.groups.find(item => String(item.id) === String(groupId));
        if (!group) return;

        const newName = this.view.getEditedName(groupId);
        if (!newName) {
            this.view.showError('El nombre del grupo no puede estar vacío.');
            return;
        }

        if (newName === group.name) {
            this.view.resetRow(groupId, group.name, group.name === 'ADMIN');
            return;
        }

        if (group.name === 'ADMIN') {
            this.view.showError('El grupo ADMIN no puede ser editado.');
            this.view.resetRow(groupId, group.name, true);
            return;
        }

        try {
            await this.model.updateGroupName(groupId, newName);
            group.name = newName;
            this.view.resetRow(groupId, group.name, group.name === 'ADMIN');
        } catch (error) {
            console.error('Error actualizando grupo', error);
            this.view.showError('Ocurrió un error al actualizar el grupo.');
            this.view.resetRow(groupId, group.name, group.name === 'ADMIN');
        }
    }

    onCancelEdit(groupId) {
        const group = this.model.groups.find(g => String(g.id) === String(groupId));
        if (!group) return;

        this.view.resetRow(groupId, group.name, group.name === 'ADMIN');
    }

    async onSaveNewGroup(newName) {
        if (!newName) {
            this.view.showError('El nombre del grupo no puede estar vacío.');
            return;
        }
        if (this.model.groups.find(g => g.name === newName)) {
            this.view.showError('Ya existe un grupo con ese nombre.');
            return;
        }
        try {
            await this.model.createGroup(newName);
            this.view.renderGroups(this.model.groups);
        } catch (error) {
            console.error('Error creando grupo', error);
            this.view.showError('Ocurrió un error al crear el grupo.');
        }
    }
    onGoBack() {
        window.dispatchEvent(new Event("trigger-loggedIn-admin"));
    }
}

export { GroupsController };
