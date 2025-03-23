"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let usercount = 0;
wss.on("connection", (socket) => {
    //sockets lets talk to the client who is connected to the server
    usercount++;
    console.log("Client connected #", usercount);
});
