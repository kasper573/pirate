import { styled } from "@stitches/react";
import { useClientDispatch } from "../service/client";
import { slice } from "../state/slice";
import { useSelector } from "../state/store";
import { Dialog } from "./Dialog";
import { DialogMessage } from "./DialogMessage";

export function DeathDialog() {
  const dispatch = useClientDispatch();
  const clientId = useSelector((state) => state.clientId);
  const playAgain = () => dispatch(slice.actions.playAgain(clientId));
  return (
    <Dialog>
      <DialogMessage>You are dead</DialogMessage>
      <Button onClick={playAgain}>Play again</Button>
    </Dialog>
  );
}

const Button = styled("button", {
  border: 0,
  padding: "8px 12px",
  fontSize: 24,
});
