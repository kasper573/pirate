import { styled } from "@stitches/react";
import projectileImageUrl from "../assets/cannonball.png";

export const Projectile = styled("div", {
  width: 30,
  height: 30,
  background: `url(${projectileImageUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "50% 50%",
});
