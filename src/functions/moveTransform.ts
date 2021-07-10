import { Transform } from "../state/Transform";

export function moveTransform(transform: Transform): Transform {
  return {
    ...transform,
    x: transform.x + 1,
  };
}
