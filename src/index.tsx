import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { createStore } from "./state/store";
import { Client, ClientContext, createClient } from "./service/client";

const store = createStore();
let client: Client;

function connect() {
  client = createClient(store, connect);
  updateApp();
}

connect();

function updateApp() {
  render(
    <ClientContext.Provider value={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ClientContext.Provider>,
    document.getElementById("root")
  );
}
