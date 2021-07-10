import { Transform } from "../state/Transform";

export function translate<T extends Transform>(transform: T, speed: number): T {
  return {
    ...transform,
    x: transform.x + speed * Math.cos(transform.angle),
    y: transform.y + speed * Math.sin(transform.angle),
  };
}
