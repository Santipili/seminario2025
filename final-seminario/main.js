const { server } = require('./server/server.js');
const { RequestHandler } = require('./server/requestHandler/requestHandler.js');
const { SessionHandler } = require('./handlers/sessionHandler.js');
const { UserHandler } = require('./handlers/userHandler.js');
const { GroupHandler } = require('./handlers/groupHandler.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const api = new server();

const sessionHandler = new SessionHandler();
const userHandler = new UserHandler();
const groupHandler = new GroupHandler();

const rh = new RequestHandler(sessionHandler, userHandler, groupHandler);

api.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello!");
});

api.post('/user/signIn', rh.signIn);
api.put('/user/logout', rh.logout);
api.post('/user/signUp', rh.signUp);

api.post('/user/register', rh.registerUser);
api.post('/user/delete', rh.deleteUser);
api.put('/user/edit', rh.editUser);
api.get('/user/getList', rh.listUsers);
api.get('/user/getOne', rh.getUserById);

api.post('/group/add', rh.newGroup);
api.post('/group/delete', rh.deleteGroup);
api.put('/group/edit', rh.editGroup);
api.get('/group/getList', rh.listGroups);

api.start(PORT, HOST);
