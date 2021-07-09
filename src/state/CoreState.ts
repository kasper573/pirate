import { EntityState } from "@reduxjs/toolkit";
import { ShipDefinition } from "./ShipDefinition";

export interface CoreState {
  ships: EntityState<ShipDefinition>
}