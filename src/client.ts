import { AppStore } from "./state/store";
import { serverPort } from "./config";

const serverUrl = () => `ws://${window.location.hostname}:${serverPort}`

export const createClient = (store: AppStore) => {
  const ws = new WebSocket(serverUrl());
  ws.onmessage = (e) => {
    console.log("message", e.data);
  }
}