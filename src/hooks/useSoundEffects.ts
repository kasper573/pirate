import useSound from "use-sound";
import { useEffect, useRef } from "react";
import { useSelector } from "../state/store";

export function useSoundEffects() {
  const [playCannonFire] = useSound("shoot.wav");
  const playedRef = useRef<Record<string, boolean>>({});
  const projectiles = useSelector((state) => state.projectiles.ids);
  useEffect(() => {
    for (const id of projectiles) {
      const played = playedRef.current[id];
      if (!played) {
        playedRef.current[id] = true;
        playCannonFire();
      }
    }
  }, [playCannonFire, projectiles]);
}
