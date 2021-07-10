import { useMouse } from "react-use";
import { useRef } from "react";
import { styled } from "@stitches/react";
import useResizeObserver from "use-resize-observer";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { useSelector } from "../state/store";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";

export function App() {
  const oceanRef = useRef<HTMLDivElement>(null);
  const clientId = useSelector((state) => state.clientId);
  const ships = useSelector((state) => state.ships);
  const mouse = useMouse(oceanRef);
  const { width, height } = useResizeObserver({ ref: oceanRef });
  globalStyle();
  return (
    <Ocean ref={oceanRef}>
      {ships.ids.map((id) => {
        const ship = ships.entities[id]!;
        return <Ship key={id} style={createTransformStyle(ship.transform)} />;
      })}
      <Info>
        <pre>
          {JSON.stringify(
            { clientId, mouse, viewport: { width, height } },
            null,
            2
          )}
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
