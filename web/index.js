// @ts-check
import express from "express";
import http from "http";
import { Server } from "socket.io";

import connectWebSocket from "./config/websocket.js";
import setupExpress from "./config/express.js";

const PORT = parseInt(process.env.PORT || "8081", 10);
console.log("PORT", PORT);
const app = express();
const server = http.createServer(app);
const io = new Server(server);

setupExpress(app, express);

connectWebSocket(io, app);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
