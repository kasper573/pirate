import { createSlice } from "@reduxjs/toolkit";
import { CoreState } from "./CoreState";

const initialState: CoreState = {ships: {ids: [], entities: {}}};

export const core = createSlice({
  name: "core",
  initialState,
  reducers: {

  }
})