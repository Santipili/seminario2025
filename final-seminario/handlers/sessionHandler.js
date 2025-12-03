const { AuthController } = require('../controllers/authController');


class SessionHandler {
    constructor() {
        this.sessionsMap = new Map();
        this.authController = new AuthController();
    }

    async signIn(payload) {
        const { nickname, password } = payload; // { nickname, password }
        const sessionData = await this.authController.login({ nickname, password });
        if (sessionData) {
            this.setNewSession(sessionData.id, sessionData.uuid, sessionData.userToken, sessionData.tokenExpirationTime);
            return sessionData;
        }
        else {
            return {
                error: error,
                message: "Username or Password Incorrect"
            };
        }
    }

    async logout(payload) {
        // payload puede tener { sessionToken } si querés
        const result = await this.authController.logout(payload || {});
        return result;
    }

    async sigUp(payload) {
        // TO DO reviasarpayload q viene desde requestHandler: { userUUID, nickname, password, ... }
        const result = await this.authController.signUp(payload);
        return result;
    }

    setNewSession(userId, userUUID, userToken, tokenExpirationTime) {
        const tokenData = {
            userId,
            userUUID,            // ESTE es el uuid de DB
            tokenExpirationTime
        };

        this.sessionsMap.set(userToken, tokenData);
    }


    // *** Método clave: recibir token y devolver uuid para los SP ***
    getUserUUIDFromToken(token) {
        if (!token) {
            throw new Error('Falta session-token en headers');
        }

        const sessionData = this.sessionsMap.get(token);
        if (!sessionData) {
            throw new Error('Sesión inválida');
        }

        const now = new Date();
        if (sessionData.tokenExpirationTime < now) {
            this.sessionsMap.delete(token);
            throw new Error('Sesión expirada');
        }

        return sessionData.userUUID;
    }
}

module.exports = { SessionHandler };
