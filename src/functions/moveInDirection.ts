import { Transform } from "../state/Transform";

export function moveInDirection(
  transform: Transform,
  angle: number,
  speed: number
): Transform {
  return {
    ...transform,
    x: transform.x + speed * Math.cos(angle),
    y: transform.y + speed * Math.sin(angle),
  };
}
