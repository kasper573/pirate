import { ShipDefinition, ShipId } from "../state/ShipDefinition";
import { oceanSize } from "../config";

export function createShip(id: ShipId): ShipDefinition {
  return {
    id,
    alive: true,
    transform: {
      x: Math.random() * oceanSize.width,
      y: Math.random() * oceanSize.height,
      angle: Math.random() * Math.PI * 2,
    },
  };
}
