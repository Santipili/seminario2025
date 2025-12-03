const { GroupController } = require('../controllers/groupController');

class GroupHandler {
    constructor() {
        this.groupController = new GroupController();
    }

    async createGroup(payload) {
        const result = await this.groupController.createGroup(payload);
        return result;
    }

    async deleteGroup(payload) {
        const result = await this.groupController.deleteGroup(payload);
        return result;
    }

    async updateGroup(payload) {
        const result = await this.groupController.updateGroup(payload);
        return result;
    }

    async listGroups(payload) {
        const result = await this.groupController.listGroups(payload);
        return result;
    }
}

module.exports = { GroupHandler };
