import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../state/store";
import { App } from "./App";

test("renders app without error", () => {
  const store = createStore();
  render(<Provider store={store}><App /></Provider>);
});
