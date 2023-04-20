import { MovieFormController, MovieFormModel } from "./MovieForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import lodash, { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMovieApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { GenderEnum } from "@infrastructure/apis/client";
import { useAppSelector } from "@application/store";
import { FormActionType } from "@infrastructure/utils/formActionTypes";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: MovieFormModel) => {
    const defaultValues = {
        name: "",
        description: "",
        releaseDate: new Date(),
        language: "",
        genre: "",
        imageUrl: "",
        rating: 0,
        numberOfRatings: 0,
        duration: ""
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const useInitMovieAddForm = () => {
    const defaultValues = getDefaultValues();

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const useInitMovieUpdateForm = () => {
    const { movieToUpdate } = useAppSelector(x => x.movieReducer);
    console.log(movieToUpdate);

    const defaultValues = getDefaultValues(movieToUpdate);

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const getSchema = (defaultValues: MovieFormModel) => {
    const { formatMessage } = useIntl();

    const schema = yup.object().shape({
        id: yup.string()
            .optional(),
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.name",
                    }),
                }))
            .default(defaultValues.name),
        description: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.description",
                    }),
                }))
            .default(defaultValues.description),
        releaseDate: yup.date()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.releaseDate",
                    }),
                }))
            .default(defaultValues.releaseDate),
        language: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.language",
                    }),
                }))
            .default(defaultValues.language),
        genre: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.genre",
                    }),
                }))
            .default(defaultValues.genre),
        imageUrl: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.imageUrl",
                    }),
                }))
            .default(defaultValues.imageUrl),
        rating: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.rating",
                    }),
                }))
            .default(defaultValues.rating),
        numberOfRatings: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.numberOfRatings",
                    }),
                }))
            .default(defaultValues.numberOfRatings),
        duration: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.duration",
                    }),
                }))
            .default(defaultValues.duration)
    });

    return schema;
}

const useInitMovieForm = (action: FormActionType) => {
    if (lodash.isEqual(action, FormActionType.ADD)) {
        const { defaultValues, resolver } = useInitMovieAddForm();
        return { defaultValues, resolver };
    }

    const { defaultValues, resolver } = useInitMovieUpdateForm();
    return { defaultValues, resolver };
}

export const useMovieFormController = (action: FormActionType, onSubmit?: () => void): MovieFormController => {
    const { defaultValues, resolver } = useInitMovieForm(action);
    const {
        addMovie: {
            mutation: addMutation,
            key: addMutationKey
        },
        getMovies: { key: queryKey },
        updateMovie: {
            mutation: updateMutation,
            key: updateMutationKey
        }
    } = useMovieApi();
    const mutationKey = lodash.isEqual(action, FormActionType.ADD) ? addMutationKey : updateMutationKey;
    const mutation = lodash.isEqual(action, FormActionType.ADD) ? addMutation : updateMutation;
    const { mutateAsync: mutate, status } = useMutation([mutationKey], mutation);
    const queryClient = useQueryClient();
    const submit = useCallback((data: MovieFormModel) =>
        mutate(data).then(() => {
            queryClient.invalidateQueries([queryKey]);

            if (onSubmit) {
                onSubmit();
            }
        }), [mutate, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<MovieFormModel>({
        defaultValues,
        resolver
    });

    const selectDate = useCallback((value: unknown) => {
        console.log(value);
        setValue("releaseDate", value as Date, {
            shouldValidate: true,
        })
    }, [setValue]);

    return {
        actions: {
            handleSubmit,
            submit,
            register,
            watch,
            selectDate
        },
        computed: {
            defaultValues,
            isSubmitting: status === "loading"
        },
        state: {
            errors
        }
    }
}