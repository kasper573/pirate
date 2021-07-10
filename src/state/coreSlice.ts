import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { typedAssign } from "../functions/typedAssign";
import { oceanSize, projectileSpeed, shipSpeed } from "../config";
import { keepShipsWithin } from "../functions/keepShipsWithin";
import { expireProjectiles } from "../functions/expireProjectiles";
import { translate } from "../functions/translate";
import { ShipDefinition, ShipId } from "./ShipDefinition";
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
    angleShip: (
      state,
      { payload: { id, angle } }: PayloadAction<{ id: ShipId; angle: number }>
    ) => {
      const ship = state.ships.entities[id];
      if (ship) {
        ship.transform.angle = angle;
      }
    },
    removeShip: (state, action: PayloadAction<ShipId>) => {
      shipAdapter.removeOne(state.ships, action);
    },
    setState: (
      state,
      { payload: { clientId, ...updatedState } }: PayloadAction<CoreState>
    ) => {
      typedAssign(state, updatedState);
    },
    setClientId: (state, { payload: id }: PayloadAction<ShipId>) => {
      state.clientId = id;
    },
    fireProjectile: (
      state,
      {
        payload: { id, angleOffset, startDistance },
      }: PayloadAction<{
        id: ShipId;
        angleOffset: number;
        startDistance: number;
      }>
    ) => {
      const ship = state.ships.entities[id];
      if (!ship) {
        return;
      }
      const angle = ship.transform.angle + angleOffset;
      const transform = translate({ ...ship.transform, angle }, startDistance);
      projectileAdapter.addOne(state.projectiles, {
        id: v4(),
        transform,
        initialTransform: transform,
      });
    },
    nextFrame: ({ ships, projectiles }) => {
      // Move ships
      for (const id of ships.ids) {
        const ship = ships.entities[id]!;
        ship.transform = translate(ship.transform, shipSpeed);
      }
      keepShipsWithin(ships, oceanSize);

      // Move projectiles
      for (const id of projectiles.ids) {
        const p = projectiles.entities[id]!;
        p.transform = translate(p.transform, projectileSpeed);
      }

      expireProjectiles(projectiles, oceanSize);
    },
  },
});
