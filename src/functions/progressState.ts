import { coreSlice } from "../state/coreSlice";
import { AppStore } from "../state/store";
import { translate } from "./translate";

export function progressState(store: AppStore) {
  // Move ships
  const { ships, projectiles } = store.getState();
  for (const id of ships.ids) {
    const ship = ships.entities[id]!;
    store.dispatch(
      coreSlice.actions.updateShip({
        id: ship.id,
        changes: {
          transform: translate(ship.transform, 3),
        },
      })
    );
  }

  // Move projectiles
  for (const id of projectiles.ids) {
    const p = projectiles.entities[id]!;
    store.dispatch(
      coreSlice.actions.updateProjectile({
        id: p.id,
        changes: {
          transform: translate(p.transform, 0.5),
        },
      })
    );
  }
}
