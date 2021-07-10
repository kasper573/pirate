import { styled } from "@stitches/react";
import shipImageUrl from "../assets/ships/ship.png";
import shipWreckImageUrl from "../assets/ships/wreck.png";

export const Ship = styled("div", {
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "50% 50%",
  variants: {
    state: {
      alive: {
        backgroundImage: `url(${shipImageUrl})`,
      },
      dead: {
        backgroundImage: `url(${shipWreckImageUrl})`,
      },
    },
  },
});
