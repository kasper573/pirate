import { ShipDefinition, ShipId } from "../state/ShipDefinition";
import { mapSize } from "../config";

export function createShip(id: ShipId): ShipDefinition {
  return {
    id,
    transform: {
      x: Math.random() * mapSize.width,
      y: Math.random() * mapSize.height,
      angle: Math.random() * Math.PI * 2,
    },
  };
}
