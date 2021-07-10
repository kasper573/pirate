import { EntityId } from "@reduxjs/toolkit";
import { Transform } from "./Transform";

export type ProjectileId = EntityId;

export interface ProjectileDefinition {
  id: ProjectileId;
  transform: Transform;
}
