import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { createStore } from "./state/store";
import { ClientContext, createClient } from "./service/client";

const store = createStore();
const client = createClient(store);

render(
  <ClientContext.Provider value={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ClientContext.Provider>,
  document.getElementById("root")
);
