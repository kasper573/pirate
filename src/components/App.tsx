import { useMouse } from "react-use";
import { useRef } from "react";
import { styled } from "@stitches/react";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { useSelector } from "../state/store";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";

export function App() {
  const oceanRef = useRef<HTMLDivElement>(null);
  const ships = useSelector((state) => state.ships);
  const mouse = useMouse(oceanRef);
  globalStyle();
  return (
    <Ocean ref={oceanRef}>
      {ships.ids.map((id) => {
        const ship = ships.entities[id]!;
        return <Ship key={id} style={createTransformStyle(ship.transform)} />;
      })}
      <Info>{JSON.stringify(mouse)}</Info>
    </Ocean>
  );
}

const Info = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: 12,
});
