import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ShipDefinition } from "./ShipDefinition";

const shipAdapter = createEntityAdapter<ShipDefinition>({
  selectId: (def) => def.id,
});

export const shipSlice = createSlice({
  name: "ship",
  initialState: shipAdapter.getInitialState(),
  reducers: {
    add: shipAdapter.addOne,
    remove: shipAdapter.removeOne,
    update: shipAdapter.updateOne,
  },
});
