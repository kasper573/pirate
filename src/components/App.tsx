import React from "react";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";

export function App() {
  globalStyle();
  return (
    <Ocean>
      <Ship style={createTransformStyle({ x: 500, y: 300, rotation: 0 })} />
    </Ocean>
  );
}
