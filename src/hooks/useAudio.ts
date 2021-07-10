import useSound from "use-sound";
import { useEffect, useRef } from "react";
import { useSelector } from "../state/store";

const bgm = new Audio("bgm.mp3");
bgm.loop = true;
bgm.volume = 0.1;

export function useAudio(enabled: boolean) {
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

  useEffect(() => {
    if (enabled) {
      bgm.play();
    }
    return () => bgm.pause();
  }, [enabled]);
}
