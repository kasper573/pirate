import { styled } from "@stitches/react";
import { FormEvent, useState } from "react";
import { useClientDispatch } from "../service/client";
import { slice } from "../state/slice";
import { useSelector } from "../state/store";
import { createShip } from "../functions/createShip";
import { Dialog } from "./Dialog";

export function NameDialog() {
  const [inputName, setInputName] = useState("");
  const dispatch = useClientDispatch();
  const clientId = useSelector((state) => state.clientId);
  const registerShip = (e: FormEvent) => {
    e.preventDefault();
    dispatch(slice.actions.addShip(createShip(clientId, inputName)));
  };
  return (
    <Dialog
      style={{ backgroundColor: "rgba(255,255,255, 0.5)", color: "black" }}
    >
      <form onSubmit={registerShip}>
        <span>Yarr! Who arr yee?</span>
        <br />
        <input
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          style={{ marginBottom: 12, marginTop: 12 }}
        />
        <br />
        <Button type="submit" disabled={!inputName}>
          SET SAIL!
        </Button>
      </form>
    </Dialog>
  );
}

const Button = styled("button", {
  border: 0,
  padding: "8px 12px",
  fontSize: 24,
});
