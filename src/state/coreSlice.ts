import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import { typedAssign } from "../functions/typedAssign";
import { ShipDefinition, ShipId } from "./ShipDefinition";

const shipAdapter = createEntityAdapter<ShipDefinition>({
  selectId: (def) => def.id,
});

const initialState = {
  clientId: "" as ShipId,
  ships: shipAdapter.getInitialState(),
};

type CoreState = typeof initialState;

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    addShip: (state, action: PayloadAction<ShipDefinition>) => {
      shipAdapter.addOne(state.ships, action);
    },
    updateShip: (state, action: PayloadAction<Update<ShipDefinition>>) => {
      shipAdapter.updateOne(state.ships, action);
    },
    removeShip: (state, action: PayloadAction<ShipId>) => {
      shipAdapter.removeOne(state.ships, action);
    },
    setState: (state, { payload }: PayloadAction<CoreState>) => {
      typedAssign(state, payload);
    },
    setClientId: (state, { payload }: PayloadAction<ShipId>) => {
      state.clientId = payload;
    },
  },
});
