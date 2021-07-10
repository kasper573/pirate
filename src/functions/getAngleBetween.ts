import { Position } from "../state/Transform";

export function getAngleBetween(a: Position, b: Position): number {
  return Math.atan2(b.y - a.y, b.x - a.x);
}
