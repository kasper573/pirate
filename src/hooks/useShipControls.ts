import { RefObject } from "react";
import { useKeyPress } from "react-use";
import useAnimationFrame from "use-animation-frame";
import { useClientDispatch } from "../service/client";
import { useSelector } from "../state/store";
import { coreSlice } from "../state/coreSlice";

export function useShipControls(oceanRef: RefObject<HTMLElement>) {
  const clientDispatch = useClientDispatch();
  const myShip = useSelector((state) => state.ships.entities[state.clientId]);
  const direction = useDirection();

  useAnimationFrame(
    ({ delta }) => {
      if (!myShip) {
        return;
      }
      const newAngle = myShip.transform.angle + direction * Math.PI * delta;
      clientDispatch(
        coreSlice.actions.setShipAngle({
          id: myShip.id,
          angle: newAngle,
        })
      );
    },
    [myShip, direction]
  );

  return { direction };
}

const useDirection = () => {
  const [isLeftPressed] = useKeyPress("ArrowLeft");
  const [isRightPressed] = useKeyPress("ArrowRight");
  if (isLeftPressed) {
    return -1;
  }
  if (isRightPressed) {
    return 1;
  }
  return 0;
};
