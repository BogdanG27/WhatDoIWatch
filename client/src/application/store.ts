import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./state-slices";
import { actorReducer } from './state-slices/actor/actorSlice';

/** 
 *  This is the store to register each reduces with its own slice.
 */
export const store = configureStore({
  reducer: {
    profileReducer,
    actorReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
