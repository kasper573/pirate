import { RefObject, useEffect } from "react";
import { useMouse } from "react-use";
import { useClientDispatch } from "../service/client";
import { useSelector } from "../state/store";
import { getAngleBetween } from "../functions/getAngleBetween";
import { coreSlice } from "../state/coreSlice";

export function useShipControls(oceanRef: RefObject<HTMLElement>) {
  const clientDispatch = useClientDispatch();
  const clientId = useSelector((state) => state.clientId);
  const ships = useSelector((state) => state.ships);

  const mouse = useMouse(oceanRef);
  const mousePosition = { x: mouse.elX, y: mouse.elY };
  const myShip = ships.entities[clientId];
  const myDesiredShipAngle = myShip
    ? getAngleBetween(myShip.transform, mousePosition)
    : 0;

  useEffect(() => {
    clientDispatch(
      coreSlice.actions.setShipAngle({
        id: clientId,
        angle: myDesiredShipAngle,
      })
    );
  }, [myDesiredShipAngle, clientDispatch, clientId]);
}
