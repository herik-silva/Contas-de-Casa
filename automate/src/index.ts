import Bills from "./contasCemig/Entities/Bills";
import Server from "./Server";

const PORT = parseInt(process.env.PORT) || 3000;

const server = new Server(PORT);

server.initServer();