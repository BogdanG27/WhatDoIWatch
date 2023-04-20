import { RegisterFormController, RegisterFormModel } from "./RegisterForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRegisterApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { useDispatch } from "react-redux";
import { setToken } from "@application/state-slices";
import { toast } from "react-toastify";
import { UserRoleEnum } from "@infrastructure/apis/client";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: { email: string }) => {
    const defaultValues = {
        name: "",
        email: "",
        password: "",
        role: UserRoleEnum.Personnel
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */
const useInitRegisterForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.name",
                    }),
                }))
            .default(defaultValues.name),
        email: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.email",
                    }),
                }))
            .email()
            .default(defaultValues.email),
        password: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.password",
                    }),
                }))
            .default(defaultValues.password),
        role: yup.string()
            .oneOf([UserRoleEnum.Personnel, UserRoleEnum.Client])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.password",
                    }),
                }))
            .default(defaultValues.role),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useRegisterFormController = (): RegisterFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitRegisterForm();
    const { redirectToLogin } = useAppRouter();
    const { registerMutation: { mutation, key: mutationKey } } = useRegisterApi();
    const { mutateAsync: signUp, status } = useMutation([mutationKey], mutation);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const submit = useCallback((data: RegisterFormModel) =>
        signUp(data).then((result) => {
            toast(formatMessage({ id: "notifications.messages.registerSuccess" }));
            redirectToLogin();
        }), [signUp, queryClient, redirectToLogin, dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormModel>({
        defaultValues,
        resolver
    });

    return {
        actions: {
            handleSubmit,
            submit,
            register
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