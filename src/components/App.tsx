import { useRef } from "react";
import { styled } from "@stitches/react";
import useResizeObserver from "use-resize-observer";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { useSelector } from "../state/store";
import { useShipControls } from "../hooks/useShipControls";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";

export function App() {
  globalStyle();

  const oceanRef = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver({ ref: oceanRef });
  const ships = useSelector((state) => state.ships);

  const { direction } = useShipControls(oceanRef);

  return (
    <Ocean ref={oceanRef}>
      {ships.ids.map((id) => {
        const ship = ships.entities[id]!;
        return <Ship key={id} style={createTransformStyle(ship.transform)} />;
      })}
      <Info>
        <pre>
          {JSON.stringify({ direction, viewport: { width, height } }, null, 2)}
        </pre>
      </Info>
    </Ocean>
  );
}

const Info = styled("div", {
  position: "absolute",
  top: 12,
  left: 12,
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: 12,
});
