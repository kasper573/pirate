import { createEntityAdapter } from "@reduxjs/toolkit";
import { ShipDefinition } from "./ShipDefinition";

export const shipAdapter = createEntityAdapter<ShipDefinition>({
  selectId: (def) => def.id,
});
