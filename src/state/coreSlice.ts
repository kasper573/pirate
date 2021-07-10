import { createSlice, PayloadAction, Update } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { typedAssign } from "../functions/typedAssign";
import { oceanSize } from "../config";
import { keepShipsWithin } from "../functions/keepShipsWithin";
import { expireProjectiles } from "../functions/expireProjectiles";
import { ShipDefinition, ShipId } from "./ShipDefinition";
import { ProjectileDefinition } from "./ProjectileDefinition";
import { shipAdapter } from "./shipAdapter";
import { projectileAdapter } from "./projectileAdapter";

const initialState = {
  clientId: "" as ShipId,
  ships: shipAdapter.getInitialState(),
  projectiles: projectileAdapter.getInitialState(),
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
      keepShipsWithin(state.ships, oceanSize);
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
    fireProjectile: (
      state,
      {
        payload: { id, angleOffset },
      }: PayloadAction<{ id: ShipId; angleOffset: number }>
    ) => {
      const ship = state.ships.entities[id];
      if (!ship) {
        return;
      }
      const transform = {
        ...ship.transform,
        angle: ship.transform.angle + angleOffset,
      };
      projectileAdapter.addOne(state.projectiles, {
        id: v4(),
        transform,
        initialTransform: transform,
      });
    },
    updateProjectile: (
      state,
      action: PayloadAction<Update<ProjectileDefinition>>
    ) => {
      shipAdapter.updateOne(state.projectiles, action);
      expireProjectiles(state.projectiles, oceanSize);
    },
  },
});
