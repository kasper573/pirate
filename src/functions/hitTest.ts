import { Transform } from "../state/Transform";

export function hitTest(ta: Transform, tb: Transform): boolean {
  const a = bounds(ta);
  const b = bounds(tb);
  return !(
    a.left >= b.right ||
    a.top >= b.bottom ||
    a.right <= b.left ||
    a.bottom <= b.top
  );
}

const bounds = ({ x, y, width, height }: Transform) => ({
  left: x,
  top: y,
  right: x + width,
  bottom: y + height,
});
