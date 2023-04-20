import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { GenderEnum, StaffTypeEnum } from "@infrastructure/apis/client";

export type StaffFormModel = {
    id?: string,
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: GenderEnum;
    type: StaffTypeEnum;
};

export type StaffFormState = {
    errors: FieldErrorsImpl<DeepRequired<StaffFormModel>>;
};

export type StaffFormActions = {
    register: UseFormRegister<StaffFormModel>;
    watch: UseFormWatch<StaffFormModel>;
    handleSubmit: UseFormHandleSubmit<StaffFormModel>;
    submit: (body: StaffFormModel) => void;
    selectGender: (value: SelectChangeEvent<GenderEnum>) => void;
    selectType: (value: SelectChangeEvent<StaffTypeEnum>) => void;
    selectDate: (value: unknown) => void;
};
export type StaffFormComputed = {
    defaultValues: StaffFormModel,
    isSubmitting: boolean
};

export type StaffFormController = FormController<StaffFormState, StaffFormActions, StaffFormComputed>;