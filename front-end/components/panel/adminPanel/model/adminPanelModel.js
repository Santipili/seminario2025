import { ApiClient } from "../../../../common/ApiClient.js";
import { configApiFileSystem } from "../../../../config.js";
import { LocalStorageHandler } from "../../../../common/LocalStorageHandler.js";

class AdminPanelModel {
    constructor() {
        this.apiClient = new ApiClient(configApiFileSystem.url);
        this.localStorage = new LocalStorageHandler();
        this.currentUserId = null;
        this.currentUserNickname = null;
        this.users = [];
        /** @type {Array<{id:number, name:string, surname:string, dni:string, email:string, group:string}>} */
    }

    initFromLocalStorage() {
        this.currentUserId = this.localStorage.getOfLocalStorage("userId") || null;
        this.currentUserNickname = this.localStorage.getOfLocalStorage("nickname") || "Usuario";
    }

    async loadUsers() {
        if (!this.currentUserId) {
            console.warn("No hay userId en localStorage, no se pueden cargar usuarios");
            this.users = [];
            return this.users;
        }

        const response = await this.apiClient.makeApiCall(
            "user/getList",
            "GET",
            null,
            null,
            this.currentUserId
        );

        this.users = response?.data?.users || response?.data || [];
        return this.users;
    }

    async getAvailableGroups() {
        if (!this.currentUserId) {
            console.warn("No hay userId en localStorage, no se pueden cargar usuarios");
            this.users = [];
            return this.users;
        }

        const response = await this.apiClient.makeApiCall(
            "group/getList",
            "GET",
            null,
            null,
            this.currentUserId
        );
        if (response?.status) {
            const groups = response?.data || [];
            return groups;
        }
        return [];
    }

    async deleteUser(targetUserId) {
        if (!this.currentUserId) {
            throw new Error("No hay userId del usuario logueado");
        }

        const body = {
            deleteUserId: targetUserId,
        };

        const response = await this.apiClient.makeApiCall(
            "user/delete",
            "POST",
            body,
            null,
            this.currentUserId
        );

        if (!!response?.deleted) {
            this.users = this.users.filter(u => u.id !== targetUserId);
        }

        return response;
    }

    async updateUserGroup(userIdToUpdate, newGroup) {
        if (!this.currentUserId) {
            throw new Error("No hay userId del usuario logueado");
        }

        const body = {
            updateUserId: userIdToUpdate,
            group: newGroup
        };

        const response = await this.apiClient.makeApiCall(
            "user/updateGroup",
            "PUT",
            body,
            null,
            this.currentUserId
        );
        // -----------------
        // TO DO:
        // Actualizamos si la API responde OK
        // -----------------
        const user = this.users.find(u => u.id === userIdToUpdate);
        if (user) user.group = newGroup;

        return response;
    }
}

export { AdminPanelModel };