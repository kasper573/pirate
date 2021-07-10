import { styled } from "@stitches/react";

export const Dialog = styled("div", {
  background: "rgba(0, 0, 0, 0.5)",
  borderRadius: 12,
  padding: 24,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});
