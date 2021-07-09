import React from "react";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";

export function App() {
  globalStyle();
  return (
    <Ocean>
      <Ship style={createTransformStyle({ x: 150, y: 150, rotation: 0 })} />
    </Ocean>
  );
}
