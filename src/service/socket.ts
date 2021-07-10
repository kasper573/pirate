import { AppAction, AppStore } from "../state/store";

export function parseActionFromSocket(e: MessageEvent): AppAction {
  return JSON.parse(e.data);
}

export function receiveActionFromSocket(e: MessageEvent, store: AppStore) {
  const action = parseActionFromSocket(e);
  store.dispatch(action);
  return action;
}

export function dispatchToSocket(ws: WebSocket, action: AppAction) {
  if (ws.readyState === 1) {
    return ws.send(JSON.stringify(action));
  }
}
