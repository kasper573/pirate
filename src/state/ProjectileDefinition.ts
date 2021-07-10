import { EntityId } from "@reduxjs/toolkit";
import { Transform } from "./Transform";
import { ShipId } from "./ShipDefinition";

export type ProjectileId = EntityId;

export interface ProjectileDefinition {
  id: ProjectileId;
  shooterId: ShipId;
  transform: Transform;
}
