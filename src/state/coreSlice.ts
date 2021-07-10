import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ShipDefinition, ShipId } from "./ShipDefinition";

const shipAdapter = createEntityAdapter<ShipDefinition>({
  selectId: (def) => def.id,
});

export const coreSlice = createSlice({
  name: "core",
  initialState: {
    ships: shipAdapter.getInitialState(),
  },
  reducers: {
    addShip: (state, payload: PayloadAction<ShipDefinition>) => {
      shipAdapter.addOne(state.ships, payload);
    },
    removeShip: (state, payload: PayloadAction<ShipId>) => {
      shipAdapter.removeOne(state.ships, payload);
    },
  },
});
