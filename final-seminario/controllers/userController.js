const userRepo = require('../db/userRepository');

class UserController {
    constructor() { }

    async createUser(data) {
        const {
            userUUID,
            nickname,
            password,
            name,
            surname,
            NID,
            email,
            phone,
            groupName,
        } = data;

        if (!userUUID) throw new Error('user-id requerido en headers');

        const result = await userRepo.createUser({
            userNickName: nickname,
            userPassword: password,
            userName: name,
            userSurname: surname,
            userNID: NID,
            userEmail: email,
            userPhone: phone,
            userUUID,
            userGroup: groupName,
        });

        return result;
    }

    async deleteUser(data) {
        const { userUUID, deleteUserId } = data;

        if (!userUUID) throw new Error('session-token requerido en headers');
        if (!deleteUserId) throw new Error('userId requerido');

        const result = await userRepo.deleteUser({
            userUUID,
            deleteUserId: deleteUserId,
        });

        return result;
    }

    async updateUser(data) {
        const {
            userUUID,
            id, // id del usuario a actualizar
            nickname,
            name,
            surname,
            NID,
            email,
            phone,
            groupName,
        } = data;

        if (!userUUID) throw new Error('session-token requerido en headers');
        if (!id) throw new Error('id del usuario requerido');

        const result = await userRepo.updateUser({
            pUserUUID: userUUID,
            pUserUpdateId: id,
            pNickName: nickname,
            pName: name,
            pSurname: surname,
            pNID: NID,
            pEmail: email,
            pPhone: phone,
            pGroupName: groupName,
        });

        return result;
    }

    async getUsersList({ userUUID }) {
        if (!userUUID) throw new Error('user-id requerido en headers');

        const result = await userRepo.readAllUsers({ userUUID });
        return result;
    }

    async getUserById({ userUUID, userId }) {
        if (!userUUID) throw new Error('session-token requerido en headers');
        if (!userId) throw new Error('userId requerido');

        const result = await userRepo.readUser({
            userUUID,
            readUserId: userId,
        });

        return result;
    }
}

module.exports = { UserController };
