import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { GenderEnum } from "@infrastructure/apis/client";

export type ActorFormModel = {
    id?: string,
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: GenderEnum;
    photoUrl: string;
};

export type ActorFormState = {
    errors: FieldErrorsImpl<DeepRequired<ActorFormModel>>;
};

export type ActorFormActions = {
    register: UseFormRegister<ActorFormModel>;
    watch: UseFormWatch<ActorFormModel>;
    handleSubmit: UseFormHandleSubmit<ActorFormModel>;
    submit: (body: ActorFormModel) => void;
    selectGender: (value: SelectChangeEvent<GenderEnum>) => void;
    selectDate: (value: unknown) => void;
};
export type ActorFormComputed = {
    defaultValues: ActorFormModel,
    isSubmitting: boolean
};

export type ActorFormController = FormController<ActorFormState, ActorFormActions, ActorFormComputed>;