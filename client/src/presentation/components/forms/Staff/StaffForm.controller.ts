import { StaffFormController, StaffFormModel } from "./StaffForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import lodash, { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStaffApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { GenderEnum, StaffTypeEnum } from "@infrastructure/apis/client";
import { useAppSelector } from "@application/store";
import { FormActionType } from "@infrastructure/utils/formActionTypes";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: StaffFormModel) => {
    const defaultValues = {
        firstName: "",
        lastName: "",
        birthdate: new Date(),
        gender: "" as GenderEnum,
        type: "" as StaffTypeEnum
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const useInitStaffAddForm = () => {
    const defaultValues = getDefaultValues();

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const useInitStaffUpdateForm = () => {
    const { staffToUpdate } = useAppSelector(x => x.staffReducer);
    console.log(staffToUpdate);

    const defaultValues = getDefaultValues(staffToUpdate);

    const schema = getSchema(defaultValues);
    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

const getSchema = (defaultValues: StaffFormModel) => {
    const { formatMessage } = useIntl();

    const schema = yup.object().shape({
        id: yup.string()
            .optional(),
        firstName: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.name",
                    }),
                }))
            .default(defaultValues.firstName),
        lastName: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.email",
                    }),
                }))
            .default(defaultValues.lastName),
        birthdate: yup.date()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.password",
                    }),
                }))
            .default(defaultValues.birthdate),
        gender: yup.string()
            .oneOf([
                GenderEnum.Female,
                GenderEnum.Male,
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.role",
                    }),
                }))
            .default(defaultValues.gender)
    });

    return schema;
}

const useInitStaffForm = (action: FormActionType) => {
    if (lodash.isEqual(action, FormActionType.ADD)) {
        const { defaultValues, resolver } = useInitStaffAddForm();
        return { defaultValues, resolver };
    }

    const { defaultValues, resolver } = useInitStaffUpdateForm();
    return { defaultValues, resolver };
}

export const useStaffFormController = (action: FormActionType, onSubmit?: () => void): StaffFormController => {
    const { defaultValues, resolver } = useInitStaffForm(action);
    const {
        addStaff: {
            mutation: addMutation,
            key: addMutationKey
        },
        getStaffs: { key: queryKey },
        updateStaff: {
            mutation: updateMutation,
            key: updateMutationKey
        }
    } = useStaffApi();
    const mutationKey = lodash.isEqual(action, FormActionType.ADD) ? addMutationKey : updateMutationKey;
    const mutation = lodash.isEqual(action, FormActionType.ADD) ? addMutation : updateMutation;
    const { mutateAsync: mutate, status } = useMutation([mutationKey], mutation);
    const queryClient = useQueryClient();
    const submit = useCallback((data: StaffFormModel) =>
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
    } = useForm<StaffFormModel>({
        defaultValues,
        resolver
    });

    const selectGender = useCallback((event: SelectChangeEvent<GenderEnum>) => {
        setValue("gender", event.target.value as GenderEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectType = useCallback((event: SelectChangeEvent<StaffTypeEnum>) => {
        setValue("type", event.target.value as StaffTypeEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectDate = useCallback((value: unknown) => {
        console.log(value);
        setValue("birthdate", value as Date, {
            shouldValidate: true,
        })
    }, [setValue]);

    return {
        actions: {
            handleSubmit,
            submit,
            register,
            watch,
            selectGender,
            selectType,
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