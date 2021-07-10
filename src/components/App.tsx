import { globalStyle } from "../globalStyle";
import { createTransformStyle } from "../functions/createTransformStyle";
import { useSelector } from "../state/store";
import { Ocean } from "./Ocean";
import { Ship } from "./Ship";

export function App() {
  const ships = useSelector((state) => state.ships);
  globalStyle();
  return (
    <Ocean>
      {ships.ids.map((id) => {
        const ship = ships.entities[id]!;
        return <Ship key={id} style={createTransformStyle(ship.transform)} />;
      })}
    </Ocean>
  );
}
