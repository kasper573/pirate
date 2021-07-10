import { createEntityAdapter } from "@reduxjs/toolkit";
import { ProjectileDefinition } from "./ProjectileDefinition";

export const projectileAdapter = createEntityAdapter<ProjectileDefinition>({
  selectId: (def) => def.id,
});
