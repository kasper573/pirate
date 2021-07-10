import { styled } from "@stitches/react";

export function Instructions() {
  return (
    <Dialog>
      <div style={{ textAlign: "right" }}>Controls</div>
      <br />
      <b>A:</b> Steer Left
      <br />
      <b>B:</b> Steer Right
      <br />
      <b>Left mouse</b> Fire Left Cannon
      <br />
      <b>Right mouse</b> Fire Right Cannon
      <br />
    </Dialog>
  );
}

const Dialog = styled("div", {
  background: "rgba(0, 0, 0, 0.5)",
  borderRadius: 12,
  fontSize: 24,
  padding: 24,
  position: "absolute",
  color: "white",
  right: 12,
  bottom: 12,
});
