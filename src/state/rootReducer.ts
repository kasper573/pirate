import { combineReducers } from "@reduxjs/toolkit";
import { shipSlice } from "./shipSlice";

export const rootReducer = combineReducers({
  ships: shipSlice.reducer,
});
