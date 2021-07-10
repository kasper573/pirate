import { Size } from "../state/Size";

export function objectFitContain(containerSize: Size, contentSize: Size) {
  const desiredAspectRatio = contentSize.width / contentSize.height;

  let width = containerSize.width;
  let height = width / desiredAspectRatio;
  if (height > containerSize.height) {
    height = containerSize.height;
    width = height * desiredAspectRatio;
  }

  const size = { width, height };
  const scale = width / contentSize.width;
  return [scale, size] as const;
}
