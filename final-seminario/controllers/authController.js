const { findUserByCredentials } = require('../db/authRepository');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const userRepo = require('../db/userRepository');

class AuthController {
    constructor() { }

    async login({ nickname, password }) {
        if (!nickname || !password) {
            throw new Error('nickname y password son requeridos');
        }

        const validatedUser = await findUserByCredentials(nickname, password);

        if (!validatedUser) {
            throw new Error('Credenciales inválidas');
        }
        const user = validatedUser[0];

        const userToken = this.generateToken(nickname);
        const tokenExpirationTime = new Date();
        tokenExpirationTime.setMinutes(tokenExpirationTime.getMinutes() + 10);

        return {
            id: user.id,
            nickname: user.nickname,
            uuid: user.uuid,
            isAdmin: !!user.isAdmin,
            sessionToken: userToken,
            tokenExpirationTime: tokenExpirationTime,
            message: "Signed"
        };
    }

    async logout({ sessionToken }) {
        // Si hicieras sesiones en memoria o DB, acá las invalidarías.
        // Por ahora, solo devolvemos OK y el cliente borra el token.
        return { success: true };
    }

    async signUp(data) {
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

        if (!userUUID) throw new Error('session-token requerido en headers');

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

    generateToken(param) {
        const uuid = uuidv4();
        const hash = crypto.createHash('sha256');
        const dataToHash = param + uuid;
        hash.update(dataToHash);
        const token = hash.digest('hex');
        return token;
    }

}

module.exports = { AuthController };
