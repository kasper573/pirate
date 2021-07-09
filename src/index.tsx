
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { store } from "./state/store";

const mountNode = document.getElementById("root");
render(<Provider store={store}><App /></Provider>, mountNode);
