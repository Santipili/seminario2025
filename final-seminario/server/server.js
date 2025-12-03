const http = require('http');

class server {
    constructor() {
        this.handlers = [];
        this.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers":
                "content-type, session-token, user-id",
            "Content-Type": "application/json",
        };
    }

    get(url, handlerReference) {
        this.handlers['GET' + url] = handlerReference;
    }

    post(url, handlerReference) {
        this.handlers['POST' + url] = handlerReference;
    }

    put(url, handlerReference) {
        this.handlers['PUT' + url] = handlerReference;
    }

    delete(url, handlerReference) {
        this.handlers['DELETE' + url] = handlerReference;
    }

    start(port, host) {
        const server = http.createServer((req, res) => {
            this.processRequest(req, res);
        })

        server.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}/`);
        });
    }

    async processRequest(req, res) {
        let method = req.method;
        let url = req.url;
        const key = method + url;

        if (req.method === "OPTIONS") {
            res.writeHead(204, this.headers);
            return res.end();
        } else {
            res.writeHead(200, this.headers);
        }

        if (!this.handlers[key]) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("Error 404. Ruta no encontrada");
        } else {
            await this.handlers[key](req, res);
        }
    }
}
module.exports = { server };
