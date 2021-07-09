import { CSSProperties } from "react";
import { Transform } from "../state/Transform";

export const createTransformStyle = ({
  x,
  y,
  rotation,
}: Transform): CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
});
