import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type MovieFormModel = {
    id?: string,
    name: string;
    description: string;
    releaseDate: Date;
    language: string;
    genre: string;
    imageUrl: string;
    rating: number;
    numberOfRatings: number;
    duration: string;
};

export type MovieFormState = {
    errors: FieldErrorsImpl<DeepRequired<MovieFormModel>>;
};

export type MovieFormActions = {
    register: UseFormRegister<MovieFormModel>;
    watch: UseFormWatch<MovieFormModel>;
    handleSubmit: UseFormHandleSubmit<MovieFormModel>;
    submit: (body: MovieFormModel) => void;
    selectDate: (value: unknown) => void;
};
export type MovieFormComputed = {
    defaultValues: MovieFormModel,
    isSubmitting: boolean
};

export type MovieFormController = FormController<MovieFormState, MovieFormActions, MovieFormComputed>;