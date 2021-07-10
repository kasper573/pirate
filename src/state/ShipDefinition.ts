import { EntityId } from "@reduxjs/toolkit";
import { Transform } from "./Transform";

export type ShipId = EntityId;

export interface ShipDefinition {
  id: ShipId;
  transform: Transform;
}