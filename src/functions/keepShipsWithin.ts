import { EntityState } from "@reduxjs/toolkit";
import { ShipDefinition } from "../state/ShipDefinition";
import { Position } from "../state/Position";
import { Size } from "../state/Size";

export function keepShipsWithin(
  ships: EntityState<ShipDefinition>,
  size: Size
) {
  for (const id of ships.ids) {
    const ship = ships.entities[id]!;
    ship.transform = {
      ...ship.transform,
      ...modulatePosition(ship.transform, size),
    };
  }
}

function modulatePosition(
  { x, y }: Position,
  { width, height }: Size
): Position {
  return {
    x: (x < 0 ? width + x : x) % width,
    y: (y < 0 ? height + y : y) % height,
  };
}
