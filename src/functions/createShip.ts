import { ShipDefinition, ShipId } from "../state/ShipDefinition";

export function createShip(id: ShipId): ShipDefinition {
  return {
    id,
    transform: {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      rotation: Math.random() * 360,
    },
  };
}
