import { styled } from "@stitches/react";
import { useSelector } from "../state/store";

export function Scoreboard() {
  const scores = useSelector((state) => state.scores);
  const ships = useSelector((state) => state.ships);
  const orderedIds = ships.ids.slice().sort((idA, idB) => {
    const a = scores[idA] ?? 0;
    const b = scores[idB] ?? 0;
    return b - a;
  });
  return (
    <Dialog>
      <p>Scoreboard</p>
      <ul>
        {orderedIds.map((id) => {
          const ship = ships.entities[id];
          const name = id.toString().substr(0, 10);
          const score = scores[id] ?? 0;
          return (
            <li>
              {name}: {score}
            </li>
          );
        })}
      </ul>
    </Dialog>
  );
}

const Dialog = styled("div", {
  position: "absolute",
  top: 12,
  right: 12,
  padding: 24,
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  fontSize: 24,
});
