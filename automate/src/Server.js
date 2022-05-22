"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./router/routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor(newPort) {
        this.port = newPort || parseInt(process.env.PORT);
        this.app = (0, express_1.default)();
    }
    initServer(port = this.port) {
        this.app.use(express_1.default.static(__dirname + "/public"));
        this.app.use(body_parser_1.default.json());
        this.app.use(routes_1.default);
        this.app.use(cors_1.default);
        this.app.listen(port, () => {
            console.log(`http://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
