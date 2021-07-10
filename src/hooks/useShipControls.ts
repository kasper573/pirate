import { useKeyPress, useKeyPressEvent } from "react-use";
import useAnimationFrame from "use-animation-frame";
import { useClientDispatch } from "../service/client";
import { useSelector } from "../state/store";
import { coreSlice } from "../state/coreSlice";

export function useShipControls() {
  const clientDispatch = useClientDispatch();
  const myShip = useSelector((state) => state.ships.entities[state.clientId]);
  const direction = useDirection();

  useFireCannonEvent(() => {
    if (myShip) {
      clientDispatch(
        coreSlice.actions.fireProjectile({
          id: myShip.id,
          angleOffset: Math.PI / 2,
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

const useFireCannonEvent = (fire: () => void) => {
  useKeyPressEvent(" ", fire);
};

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
