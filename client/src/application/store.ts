import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./state-slices";
import { actorReducer } from './state-slices/actor/actorSlice';
import { staffReducer } from './state-slices/staff/staffSlice';
import { movieReducer } from './state-slices/movie/movieSlice';

/** 
 *  This is the store to register each reduces with its own slice.
 */
export const store = configureStore({
  reducer: {
    profileReducer,
    actorReducer,
    staffReducer,
    movieReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
