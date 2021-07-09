import http from "http";
import ws from "ws";
import express from "express"
import { serverPort } from "../config";

const httpServer = http.createServer(express());
const wsServer = new ws.Server({ server: httpServer });

wsServer.on('connection', (ws: WebSocket) => {
  ws.onmessage = (e) => {
    console.log('received: %s', e.data);
    ws.send(`Hello, you sent -> ${e.data}`);
  }

  ws.send('Hi there, I am a WebSocket server');
});


httpServer.listen(serverPort, () => console.log(`Server started on port ${serverPort}`));