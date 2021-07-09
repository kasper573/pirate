import React from "react";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";
import { globalStyle } from "./globalStyle";

export function App() {
  globalStyle();
  return (
    <Ocean>
      <Ship />
    </Ocean>
  );
}
