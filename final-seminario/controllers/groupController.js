// controllers/GroupController.js
const groupRepo = require('../db/groupRepository');

class GroupController {
    constructor() { }

    async createGroup({ userUUID, newGroupName }) {
        if (!userUUID) throw new Error('user-id requerido en headers');
        if (!newGroupName) throw new Error('name del grupo requerido');

        const result = await groupRepo.createGroup({
            groupName: newGroupName,
            userUUID,
        });

        return result;
    }

    async deleteGroup({ userUUID, groupId }) {
        if (!userUUID) throw new Error('user-id requerido en headers');
        if (!groupId) throw new Error('groupId requerido');

        const result = await groupRepo.deleteGroup({
            groupId,
            userUUID,
        });

        return result;
    }

    async updateGroup({ userUUID, groupId, newGroupName }) {
        if (!userUUID) throw new Error('user-id requerido en headers');
        if (!groupId) throw new Error('groupId requerido');
        if (!newGroupName) throw new Error('nuevo nombre requerido');

        const result = await groupRepo.updateGroup({
            groupId,
            userUUID,
            newGroupName,
        });

        return result;
    }

    async listGroups({ userUUID }) {
        if (!userUUID) throw new Error('user id requerido en headers');

        const result = await groupRepo.readGroups({ userUUID });
        return result;
    }
}

module.exports = { GroupController };
