import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Staff, StaffState } from "./staffSlice.types";
import { StaffDTO } from '../../../infrastructure/apis/client/models/StaffDTO';
import { GenderEnum, StaffTypeEnum } from "@infrastructure/apis/client";
import { string } from "yup";

const initialState: StaffState = {
  staffToUpdate: {
    id: "",
    firstName: "",
    lastName: "",
    birthdate: new Date(),
    gender: "" as GenderEnum,
    type: "" as StaffTypeEnum
  }
}

export const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    setStaffToUpdate: (state, action: PayloadAction<Staff>) => {
      state.staffToUpdate = action.payload
    },
  }
});

export const {
  setStaffToUpdate,
} = staffSlice.actions;

export const staffReducer = staffSlice.reducer; // Export the reducer.
