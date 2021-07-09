import { styled } from "@stitches/react";
import shipImageUrl from "../assets/ships/ship.png";

export const Ship = styled("div", {
  width: 100,
  height: 200,
  background: `url(${shipImageUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "50% 50%",
});
