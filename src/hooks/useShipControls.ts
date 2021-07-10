import { useKeyPress, useKeyPressEvent } from "react-use";
import useAnimationFrame from "use-animation-frame";
import { useEffect } from "react";
import { useClientDispatch } from "../service/client";
import { useSelector } from "../state/store";
import { coreSlice } from "../state/coreSlice";

export function useShipControls() {
  const clientDispatch = useClientDispatch();
  const myShip = useSelector((state) => state.ships.entities[state.clientId]);
  const direction = useDirection();
  useKeyPressEvent(" ", () => {
    if (myShip) {
      clientDispatch(coreSlice.actions.killShip(myShip.id));
    }
  });

  useFireCannonEvent((direction) => {
    if (myShip) {
      clientDispatch(
        coreSlice.actions.fireProjectile({
          id: myShip.id,
          angleOffset: (direction * Math.PI) / 2,
          startDistance: 50,
        })
      );
    }
  });

  useAnimationFrame(
    ({ delta }) => {
      if (!myShip || !direction) {
        return;
      }
      const newAngle = myShip.transform.angle + direction * Math.PI * delta;
      clientDispatch(
        coreSlice.actions.angleShip({
          id: myShip.id,
          angle: newAngle,
        })
      );
    },
    [myShip, direction]
  );

  return { direction };
}

const useFireCannonEvent = (fire: (direction: number) => void) => {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        fire(-1);
      } else if (e.button === 2) {
        fire(1);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [fire]);

  useKeyPressEvent("ArrowLeft", () => fire(-1));
  useKeyPressEvent("ArrowRight", () => fire(1));
};

const useDirection = () => {
  const [isLeftPressed] = useKeyPress("a");
  const [isRightPressed] = useKeyPress("d");
  if (isLeftPressed) {
    return -1;
  }
  if (isRightPressed) {
    return 1;
  }
  return 0;
};
