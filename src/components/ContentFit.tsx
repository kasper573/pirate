import { HTMLAttributes } from "react";
import { Size } from "../state/Size";
import { objectFitContain } from "./objectFitContain";

export interface ContentFitProps extends HTMLAttributes<HTMLDivElement> {
  containerSize: Size;
  contentSize: Size;
}

/**
 * Scales content to best fit the container, align at the specified placement.
 *
 * Think of it as a transform variant of "object-fit: contain"
 * that works on arbitrary html elements.
 */
export function ContentFit({
  children,
  containerSize,
  contentSize,
  ...divProps
}: ContentFitProps) {
  return (
    <div
      {...divProps}
      style={{ overflow: "hidden", ...containerSize, ...divProps.style }}
    >
      <div
        style={{
          overflow: "hidden",
          ...contentSize,
          ...createTransform(containerSize, contentSize),
        }}
      >
        {children}
      </div>
    </div>
  );
}

function createTransform(containerSize: Size, contentSize: Size) {
  const [scale, adjustedSize] = objectFitContain(containerSize, contentSize);
  let offsetX = (containerSize.width - adjustedSize.width) / 2;
  let offsetY = (containerSize.height - adjustedSize.height) / 2;

  return {
    transformOrigin: "top left",
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
  };
}
