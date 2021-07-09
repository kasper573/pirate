import { EntityId } from "@reduxjs/toolkit";
import { Transform } from "./Transform";

export interface ShipDefinition {
  id: EntityId;
  transform: Transform;
}