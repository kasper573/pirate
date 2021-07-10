import { useRef } from "react";
import { styled } from "@stitches/react";
import { useWindowSize } from "react-use";
import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { useSelector } from "../state/store";
import { useShipControls } from "../hooks/useShipControls";
import { oceanSize } from "../config";
import { createColorStyle } from "../functions/createColorStyle";
import { useAudio } from "../hooks/useAudio";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";
import { ContentFit } from "./ContentFit";
import { Projectile } from "./Projectile";
import { DeathDialog } from "./DeathDialog";
import { Scoreboard } from "./Scoreboard";
import { NameDialog } from "./NameDialog";

export function App() {
  globalStyle();

  const oceanRef = useRef<HTMLDivElement>(null);
  const { width = 1, height = 1 } = useWindowSize();
  const ships = useSelector((state) => state.ships);
  const myShip = useSelector((state) => state.ships.entities[state.clientId]);
  const hasName = !!myShip?.name;
  const youAreDead = !myShip?.alive;
  const projectiles = useSelector((state) => state.projectiles);

  useShipControls();
  useAudio(hasName);

  if (!hasName) {
    return <NameDialog />;
  }

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
              state={ship.alive ? "alive" : "dead"}
              style={{
                ...createTransformStyle(ship.transform),
                ...createColorStyle(ship.id as string),
              }}
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
        <Scoreboard />
        {youAreDead && <DeathDialog />}
      </Ocean>
    </Viewport>
  );
}

const Viewport = styled(ContentFit, {
  background: "black",
});
