import { ShipDefinition, ShipId } from "../state/ShipDefinition";
import { oceanSize, shipSize } from "../config";

export function createShip(id: ShipId, name: string): ShipDefinition {
  return {
    id,
    alive: true,
    name,
    transform: {
      ...shipSize,
      x: Math.random() * oceanSize.width,
      y: Math.random() * oceanSize.height,
      angle: Math.random() * Math.PI * 2,
    },
  };
}
