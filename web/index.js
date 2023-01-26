// @ts-check
import express from "express";
import http from "http";
import { Server } from "socket.io";

import connectWebSocket from "./config/websocket.js";
import setupExpress from "./config/express.js";

const PORT = parseInt("8081", 10);
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupExpress(app, express);

connectWebSocket(io);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
