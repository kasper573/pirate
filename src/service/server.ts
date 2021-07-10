import http from "http";
import ws from "ws";
import express from "express";
import { v4 } from "uuid";
import { serverPort } from "../config";
import { AppAction, createStore } from "../state/store";
import { coreSlice } from "../state/coreSlice";
import { ShipId } from "../state/ShipDefinition";
import { createShip } from "../functions/createShip";
import { parseActionFromSocket, dispatchToSocket } from "./socket";

const httpServer = http.createServer(express());
const wsServer = new ws.Server({ server: httpServer });
const sockets = new Map<ShipId, WebSocket>();
const store = createStore();

const all = () => Array.from(sockets.keys());
const others = (exclude: ShipId) => all().filter((id) => id !== exclude);

function distributeDispatch(action: AppAction, targetIds = all()) {
  store.dispatch(action);
  for (const id of targetIds) {
    const socket = sockets.get(id);
    if (socket) {
      dispatchToSocket(socket, action);
    }
  }
}

wsServer.on("connection", (ws: WebSocket) => {
  const id = v4();
  sockets.set(id, ws);
  ws.onmessage = (e) =>
    distributeDispatch(parseActionFromSocket(e), others(id));
  ws.onclose = () => {
    sockets.delete(id);
    distributeDispatch(coreSlice.actions.removeShip(id));
  };
  dispatchToSocket(ws, coreSlice.actions.setState(store.getState()));
  distributeDispatch(coreSlice.actions.addShip(createShip(id)));
});

httpServer.listen(serverPort, () =>
  console.log(`Server started on port ${serverPort}`)
);
