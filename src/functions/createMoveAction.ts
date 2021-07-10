import { ShipDefinition } from "../state/ShipDefinition";
import { coreSlice } from "../state/coreSlice";

export function createMoveAction(ship: ShipDefinition, speed = 3) {
  return coreSlice.actions.updateShip({
    id: ship.id,
    changes: {
      transform: {
        ...ship.transform,
        x: ship.transform.x + speed * Math.cos(ship.transform.angle),
        y: ship.transform.y + speed * Math.sin(ship.transform.angle),
      },
    },
  });
}
