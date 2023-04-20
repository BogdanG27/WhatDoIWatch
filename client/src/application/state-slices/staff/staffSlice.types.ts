import { GenderEnum, StaffTypeEnum } from "@infrastructure/apis/client";

export interface Staff {
    id: string,
    firstName: string,
    lastName: string,
    birthdate: Date,
    gender: GenderEnum,
    type: StaffTypeEnum
}

export type StaffState = {
    staffToUpdate: Staff
};
