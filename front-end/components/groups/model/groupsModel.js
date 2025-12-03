import { ApiClient } from "../../../common/ApiClient.js";
import { configApiFileSystem } from "../../../config.js";
import { LocalStorageHandler } from "../../../common/LocalStorageHandler.js";

class GroupsModel {
    constructor() {
        this.apiClient = new ApiClient(configApiFileSystem.url);
        this.localStorage = new LocalStorageHandler();
        this.currentUserId = null;
        this.groups = [];
    }
    initFromLocalStorage() {
        this.currentUserId = this.localStorage.getOfLocalStorage("userId") || null;
    }

    async fetchGroups() {
        const response = await this.apiClient.makeApiCall(
            "group/getList",
            "GET",
            null,
            null,
            this.currentUserId
        );
        if (response?.status) {
            this.groups = response?.data || [];
            return this.groups;
        }
        return [];
    }

    async updateGroupName(groupId, newName) {
        const body = { groupId: groupId, newGroupName: newName };
        const response = await this.apiClient.makeApiCall(
            "group/edit",
            "PUT",
            body,
            null,
            this.currentUserId
        );
        return response;
    }

    async deleteGroup(groupId) {
        // To DO:
        // Ajustar el body
        const body = { groupId: groupId };
        const response = await this.apiClient.makeApiCall(
            "group/delete",
            "POST",
            body,
            null,
            this.currentUserId
        );
        return response;
    }
    async createGroup(newName) {
        const body = { newGroupName: newName };
        const response = await this.apiClient.makeApiCall(
            "group/create",
            "POST",
            body,
            null,
            this.currentUserId
        );
        return response;
    }
}

export { GroupsModel };
