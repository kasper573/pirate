import { styled } from "@stitches/react";
import { useClientDispatch } from "../service/client";
import { slice } from "../state/slice";
import { useSelector } from "../state/store";

export function DeathDialog() {
  const dispatch = useClientDispatch();
  const clientId = useSelector((state) => state.clientId);
  const playAgain = () => dispatch(slice.actions.playAgain(clientId));
  return (
    <Dialog>
      <Message>You are dead</Message>
      <Button onClick={playAgain}>Play again</Button>
    </Dialog>
  );
}

const Dialog = styled("div", {
  background: "rgba(0, 0, 0, 0.5)",
  borderRadius: 12,
  padding: 24,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});

const Message = styled("p", {
  fontSize: 48,
  color: "white",
  margin: 0,
  marginBottom: 12,
});

const Button = styled("button", {
  border: 0,
  padding: "8px 12px",
  fontSize: 24,
});
