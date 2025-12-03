const { UserController } = require('../controllers/userController');

class UserHandler {
    constructor() {
        this.userController = new UserController();
    }

    async register(payload) {
        // TO DO reviasarpayload q viene desde requestHandler: { userUUID, nickname, password, ... }
        const result = await this.userController.createUser(payload);
        return result;
    }

    async deleteUser(payload) {
        const result = await this.userController.deleteUser(payload);
        return result;
    }

    async editUser(payload) {
        const result = await this.userController.updateUser(payload);
        return result;
    }

    async listUsers(payload) {
        const result = await this.userController.getUsersList(payload);
        return result;
    }

    async getUserById(payload) {
        const result = await this.userController.getUserById(payload);
        return result;
    }
}

module.exports = { UserHandler };
