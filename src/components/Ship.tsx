import { styled } from "@stitches/react";
import shipImageUrl from "../assets/ships/ship.png";
import shipWreckImageUrl from "../assets/ships/wreck.png";
import { shipSize } from "../config";

export const Ship = styled("div", {
  ...shipSize,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "50% 50%",
  variants: {
    variant: {
      me: {},
      enemy: {
        filter: "hue-rotate(308deg)",
      },
    },
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
