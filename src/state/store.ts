import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { coreSlice } from "./coreSlice";

export const createStore = () => configureStore({ reducer: coreSlice.reducer });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof coreSlice.reducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppAction = PayloadAction<unknown>;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
