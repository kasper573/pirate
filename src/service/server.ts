import http from "http";
import ws from "ws";
import express from "express";
import { v4 } from "uuid";
import { serverPort } from "../config";
import { AppAction, createStore } from "../state/store";
import { slice } from "../state/slice";
import { ShipId } from "../state/ShipDefinition";
import { createShip } from "../functions/createShip";
import { parseActionFromSocket, dispatchToSocket } from "./socket";

const httpServer = http.createServer(express());
const wsServer = new ws.Server({ server: httpServer });
const sockets = new Map<ShipId, WebSocket>();
const store = createStore();

function distributeDispatch(action: AppAction) {
  store.dispatch(action);
  for (const id of Array.from(sockets.keys())) {
    const socket = sockets.get(id);
    if (socket) {
      dispatchToSocket(socket, action);
    }
  }
}

wsServer.on("connection", (ws: WebSocket) => {
  const clientId = v4();
  sockets.set(clientId, ws);
  ws.onmessage = (e) => distributeDispatch(parseActionFromSocket(e));
  ws.onclose = () => {
    sockets.delete(clientId);
    distributeDispatch(slice.actions.removeShip(clientId));
  };
  dispatchToSocket(ws, slice.actions.setState(store.getState()));
  dispatchToSocket(ws, slice.actions.setClientId(clientId));
});

setInterval(() => {
  store.dispatch(slice.actions.nextFrame());
  distributeDispatch(slice.actions.setState(store.getState()));
}, 1000 / 60);

httpServer.listen(serverPort, () =>
  console.log(`Server started on port ${serverPort}`)
);
