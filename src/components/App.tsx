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
import { DebugWindow } from "./DebugWindow";
import { DeathDialog } from "./DeathDialog";

export function App() {
  globalStyle();

  const oceanRef = useRef<HTMLDivElement>(null);
  const { width = 1, height = 1 } = useWindowSize();
  const clientId = useSelector((state) => state.clientId);
  const ships = useSelector((state) => state.ships);
  const youAreDead = useSelector(
    (state) => !state.ships.entities[state.clientId]?.alive
  );
  const projectiles = useSelector((state) => state.projectiles);

  const { direction } = useShipControls();

  return (
    <Viewport
      containerSize={{ width, height }}
      contentSize={oceanSize}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Ocean style={oceanSize} ref={oceanRef}>
        {ships.ids.map((id) => {
          const ship = ships.entities[id]!;
          return (
            <Ship
              key={`ship-${id}`}
              variant={id === clientId ? "me" : "enemy"}
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
        {youAreDead && <DeathDialog />}
        <DebugWindow>
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
        </DebugWindow>
      </Ocean>
    </Viewport>
  );
}

const Viewport = styled(ContentFit, {
  background: "black",
});
