import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { typedAssign } from "../functions/typedAssign";
import {
  oceanSize,
  projectileSize,
  projectileSpeed,
  shipSize,
  shipSpeed,
} from "../config";
import { keepShipsWithin } from "../functions/keepShipsWithin";
import { expireProjectiles } from "../functions/expireProjectiles";
import { translate } from "../functions/translate";
import { hitTest } from "../functions/hitTest";
import { createHitbox } from "../functions/createHitbox";
import { createShip } from "../functions/createShip";
import { ShipDefinition, ShipId } from "./ShipDefinition";
import { shipAdapter } from "./shipAdapter";
import { projectileAdapter } from "./projectileAdapter";

const initialState = {
  clientId: "" as ShipId,
  ships: shipAdapter.getInitialState(),
  projectiles: projectileAdapter.getInitialState(),
  scores: {} as Record<ShipId, number>,
};

type CoreState = typeof initialState;

export const slice = createSlice({
  name: "core",
  initialState,
  reducers: {
    addShip: (state, { payload: id }: PayloadAction<ShipId>) => {
      shipAdapter.addOne(state.ships, createShip(id));
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
    killShip: ({ ships }, { payload: id }: PayloadAction<ShipId>) => {
      const ship = ships.entities[id];
      if (ship) {
        ship.alive = false;
      }
    },
    playAgain: ({ ships }, { payload: id }: PayloadAction<ShipId>) => {
      shipAdapter.removeOne(ships, id);
      shipAdapter.addOne(ships, createShip(id));
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
        payload: { id, angleOffset },
      }: PayloadAction<{
        id: ShipId;
        angleOffset: number;
      }>
    ) => {
      const ship = state.ships.entities[id];
      if (!ship || !ship.alive) {
        return;
      }
      const angle = ship.transform.angle + angleOffset;
      projectileAdapter.addOne(state.projectiles, {
        id: v4(),
        shooterId: ship.id,
        transform: translate(
          { ...ship.transform, ...projectileSize, angle },
          shipSize.width / 2
        ),
      });
    },
    nextFrame: ({ ships, projectiles, scores }) => {
      // Move ships
      const aliveShips = Object.values(ships.entities).filter(
        (ship): ship is ShipDefinition => !!ship?.alive
      );

      for (const ship of aliveShips) {
        ship.transform = translate(ship.transform, shipSpeed);
        const crashedInto = aliveShips.find(
          (other) =>
            ship.id !== other.id &&
            hitTest(createHitbox(ship.transform), createHitbox(other.transform))
        );
        if (crashedInto) {
          ship.alive = false;
          crashedInto.alive = false;
        }
      }
      keepShipsWithin(ships, oceanSize);

      // Move projectiles
      for (const id of projectiles.ids) {
        const p = projectiles.entities[id]!;
        p.transform = translate(p.transform, projectileSpeed);
        const hitShip = aliveShips.find(
          (ship) =>
            ship.id !== p.shooterId &&
            hitTest(createHitbox(ship.transform), p.transform)
        );
        if (hitShip) {
          hitShip.alive = false;
          projectileAdapter.removeOne(projectiles, id);
          scores[p.shooterId] = (scores[p.shooterId] ?? 0) + 1;
        }
      }

      expireProjectiles(projectiles, oceanSize);
    },
  },
});
