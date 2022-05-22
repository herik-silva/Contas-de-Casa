"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./Server"));
const PORT = parseInt(process.env.PORT) || 3000;
const server = new Server_1.default(PORT);
server.initServer();
