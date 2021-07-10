import { createContext, useContext } from "react";
import { serverPort } from "../config";
import { AppAction, AppStore } from "../state/store";
import { dispatchToSocket, receiveActionFromSocket } from "./socket";

const serverUrl = () => `ws://${window.location.hostname}:${serverPort}`;

export const createClient = (
  store: AppStore,
  onClose: WebSocket["onclose"]
) => {
  const ws = new WebSocket(serverUrl());
  ws.onmessage = (e) => receiveActionFromSocket(e, store);
  ws.onclose = onClose;
  return {
    dispatch: (action: AppAction) => {
      if (ws.readyState === 1) {
        dispatchToSocket(ws, action);
      }
    },
  };
};

export type Client = ReturnType<typeof createClient>;

export const ClientContext = createContext<Client | undefined>(undefined);

export function useClientDispatch() {
  const client = useContext(ClientContext);
  return client ? client.dispatch : noop;
}

const noop = () => {};
