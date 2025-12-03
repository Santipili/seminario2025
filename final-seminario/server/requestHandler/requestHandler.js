const { json } = require("stream/consumers");

class RequestHandler {
    constructor(sessionHandlerReference, userHandlerReference, groupHandlerReference) {
        this.sessionHandler = sessionHandlerReference;
        this.userHandler = userHandlerReference;
        this.groupHandler = groupHandlerReference;
    }

    parseBody(req) {
        return new Promise((resolve, reject) => {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const requestData = body ? JSON.parse(body) : {};
                    resolve(requestData);
                } catch (e) {
                    reject(new Error('Invalid JSON body'));
                }
            });

            req.on('error', (err) => reject(err));
        });
    }

    // ----------------------
    // -------- AUTH --------
    // ----------------------
    signIn = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const response = await this.sessionHandler.signIn(requestData);
            if (response) {
                return res.end(JSON.stringify({ status: true, message: 'sing In successful', data: response }));
            }

            return res.end(JSON.stringify({ status: false, message: 'error', response: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    logout = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const response = await this.sessionHandler.logout(requestData);

            return res.end(JSON.stringify({ status: true, message: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    signUp = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);

            const response = await this.userHandler.register({ requestData });

            return res.end(JSON.stringify({ status: true, message: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    // -----------------------
    // -------- USERS --------
    // -----------------------

    registerUser = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const userUUID = req.headers['user-id'];

            const response = await this.userHandler.register({ userUUID, ...requestData });

            return res.end(JSON.stringify({ status: true, message: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    deleteUser = async (req, res) => {
        try {
            const params = await this.parseBody(req);
            const userUUID = req.headers['user-id'];

            const response = await this.userHandler.deleteUser({ userUUID, ...params });
            if (!!response?.deleted) {
                res.statusCode = 200;
                return res.end(JSON.stringify({ status: true, message: 'user deleted', }));
            }
            res.statusCode = 400;
            return res.end(JSON.stringify({ status: false, message: 'user not deleted', }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    editUser = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const userUUID = req.headers['user-id'];

            const response = await this.userHandler.editUser({ userUUID, ...requestData });

            return res.end(JSON.stringify({ status: true, message: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    listUsers = async (req, res) => {
        try {
            const userUUID = req.headers['user-id'];

            const response = await this.userHandler.listUsers({ userUUID });

            return res.end(JSON.stringify({ status: true, message: 'list users response', data: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    getUserById = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const userUUID = req.headers['user-id'];

            const response = await this.userHandler.getUserById({ userUUID, ...requestData });

            return res.end(JSON.stringify({ status: true, message: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    // -------- GROUPS --------

    newGroup = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const userUUID = req.headers['user-id'];

            const response = await this.groupHandler.createGroup({ userUUID, ...requestData });

            return res.end(JSON.stringify({ status: true, message: 'created group', data: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    deleteGroup = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const userUUID = req.headers['user-id'];

            const response = await this.groupHandler.deleteGroup({ userUUID, ...requestData });

            return res.end(JSON.stringify({ status: true, message: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    editGroup = async (req, res) => {
        try {
            const requestData = await this.parseBody(req);
            const userUUID = req.headers['user-id'];

            const response = await this.groupHandler.updateGroup({ userUUID, ...requestData });

            return res.end(JSON.stringify({ status: true, message: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

    listGroups = async (req, res) => {
        try {
            const userUUID = req.headers['user-id'];
            const response = await this.groupHandler.listGroups({ userUUID });

            return res.end(JSON.stringify({ status: true, message: 'list groups', data: response }));
        } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ status: false, message: e.message }));
        }
    };

}

module.exports = { RequestHandler };
