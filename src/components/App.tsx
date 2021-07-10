import { useMouse } from "react-use";
import { useEffect, useRef } from "react";
import { styled } from "@stitches/react";
import useResizeObserver from "use-resize-observer";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { useSelector } from "../state/store";
import { getAngleBetween } from "../functions/getAngleBetween";
import { useClientDispatch } from "../service/client";
import { coreSlice } from "../state/coreSlice";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";

export function App() {
  const clientDispatch = useClientDispatch();
  const oceanRef = useRef<HTMLDivElement>(null);
  const clientId = useSelector((state) => state.clientId);

  const { width, height } = useResizeObserver({ ref: oceanRef });
  const ships = useSelector((state) => state.ships);

  const mouse = useMouse(oceanRef);
  const mousePosition = { x: mouse.elX, y: mouse.elY };
  const myShip = ships.entities[clientId];
  const myDesiredShipAngle = myShip
    ? getAngleBetween(myShip.transform, mousePosition)
    : 0;

  globalStyle();

  useEffect(() => {
    clientDispatch(
      coreSlice.actions.setShipAngle({
        id: clientId,
        angle: myDesiredShipAngle,
      })
    );
  }, [myDesiredShipAngle, clientDispatch, clientId]);

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
