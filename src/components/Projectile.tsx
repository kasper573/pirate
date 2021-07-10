import { styled } from "@stitches/react";
import projectileImageUrl from "../assets/cannonball.png";
import { projectileSize } from "../config";

export const Projectile = styled("div", {
  ...projectileSize,
  background: `url(${projectileImageUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "50% 50%",
});
