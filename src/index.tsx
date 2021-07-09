
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { createStore } from "./state/store";
import { createClient } from "./service/client";

const store = createStore();
const mountNode = document.getElementById("root");
createClient(store);

render(<Provider store={store}><App /></Provider>, mountNode);
