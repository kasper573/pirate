import { EntityId } from "@reduxjs/toolkit";
import { Transform } from "./Transform";

export type ShipId = EntityId;

export interface ShipDefinition {
  id: ShipId;
  alive: boolean;
  name?: string;
  transform: Transform;
}
