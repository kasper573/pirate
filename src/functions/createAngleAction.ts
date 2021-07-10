import { ShipDefinition } from "../state/ShipDefinition";
import { coreSlice } from "../state/coreSlice";

export function createAngleAction(ship: ShipDefinition, angle: number) {
  return coreSlice.actions.updateShip({
    id: ship.id,
    changes: {
      transform: {
        ...ship.transform,
        angle,
      },
    },
  });
}
