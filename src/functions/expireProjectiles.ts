import { EntityState } from "@reduxjs/toolkit";
import { Position } from "../state/Position";
import { Size } from "../state/Size";
import { ProjectileDefinition } from "../state/ProjectileDefinition";
import { projectileAdapter } from "../state/projectileAdapter";

export function expireProjectiles(
  projectiles: EntityState<ProjectileDefinition>,
  keepWithin: Size
) {
  for (const id of projectiles.ids) {
    const p = projectiles.entities[id]!;
    if (!isWithin(p.transform, keepWithin)) {
      projectileAdapter.removeOne(projectiles, p.id);
    }
  }
}

function isWithin({ x, y }: Position, { width, height }: Size): boolean {
  return x >= 0 && y >= 0 && x <= width && y <= height;
}
