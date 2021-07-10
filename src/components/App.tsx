import { useRef } from "react";
import { styled } from "@stitches/react";
import { useWindowSize } from "react-use";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { useSelector } from "../state/store";
import { useShipControls } from "../hooks/useShipControls";
import { oceanSize } from "../config";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";
import { ContentFit } from "./ContentFit";
import { Projectile } from "./Projectile";

export function App() {
  globalStyle();

  const oceanRef = useRef<HTMLDivElement>(null);
  const { width = 1, height = 1 } = useWindowSize();
  const clientId = useSelector((state) => state.clientId);
  const ships = useSelector((state) => state.ships);
  const projectiles = useSelector((state) => state.projectiles);

  const { direction } = useShipControls();

  return (
    <Viewport containerSize={{ width, height }} contentSize={oceanSize}>
      <Ocean style={oceanSize} ref={oceanRef}>
        {ships.ids.map((id) => {
          const ship = ships.entities[id]!;
          return (
            <Ship
              key={`ship-${id}`}
              style={createTransformStyle(ship.transform)}
            />
          );
        })}
        {projectiles.ids.map((id) => {
          const p = projectiles.entities[id]!;
          return (
            <Projectile
              key={`projectile-${id}`}
              style={createTransformStyle({ ...p.transform, angle: 0 })}
            />
          );
        })}
        <Info>
          <pre>
            {JSON.stringify(
              {
                clientId,
                ships: ships.ids.length,
                projectiles: projectiles.ids.length,
                direction,
                viewport: { width, height },
              },
              null,
              2
            )}
          </pre>
        </Info>
      </Ocean>
    </Viewport>
  );
}

const Viewport = styled(ContentFit, {
  background: "black",
});

const Info = styled("div", {
  position: "absolute",
  top: 12,
  left: 12,
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: 12,
});
