import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Actor, ActorState } from "./actorSlice.types";
import { ActorDTO } from '../../../infrastructure/apis/client/models/ActorDTO';
import { GenderEnum } from "@infrastructure/apis/client";
import { string } from "yup";

const initialState: ActorState = {
  actorToUpdate: {
    id: "",
    firstName: "",
    lastName: "",
    birthdate: new Date(),
    gender: "" as GenderEnum,
    photoUrl: ""
  }
}

export const actorSlice = createSlice({
  name: "actor",
  initialState: initialState,
  reducers: {
    setActorToUpdate: (state, action: PayloadAction<Actor>) => {
      state.actorToUpdate = action.payload
    },
  }
});

export const {
  setActorToUpdate,
} = actorSlice.actions;

export const actorReducer = actorSlice.reducer; // Export the reducer.
