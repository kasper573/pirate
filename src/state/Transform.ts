import { Position } from "./Position";

export interface Transform extends Position {
  width: number;
  height: number;
  angle: number;
}
