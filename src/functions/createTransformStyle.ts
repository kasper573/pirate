import { CSSProperties } from "react";
import { Transform } from "../state/Transform";

export const createTransformStyle = ({
  x,
  y,
  width,
  height,
  angle,
}: Transform): CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  width,
  height,
  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(90deg) rotate(${angle}rad)`,
});
