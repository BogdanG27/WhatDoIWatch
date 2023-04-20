import { useAppSelector } from "@application/store";
import { ApiStaffGetPageGetRequest, StaffAddDTO, StaffApi, StaffUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

const getStaffsQueryKey = "getStaffsQuery";
const getStaffQueryKey = "getStaffQuery";
const addStaffMutationKey = "addStaffMutation";
const deleteStaffMutationKey = "deleteStaffMutation";
const updateStaffMutationKey = "updateStaffMutation";

export const useStaffApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getStaffs = (page: ApiStaffGetPageGetRequest) => new StaffApi(config).apiStaffGetPageGet(page);
    const getStaff = (id: string) => new StaffApi(config).apiStaffGetByIdIdGet({ id });
    const addStaff = (staff: StaffAddDTO) => new StaffApi(config).apiStaffAddPost({ staffAddDTO: staff });
    const deleteStaff = (id: string) => new StaffApi(config).apiStaffDeleteIdDelete({ id });
    const updateStaff = (staff: StaffUpdateDTO) => new StaffApi(config).apiStaffUpdatePut({ staffUpdateDTO: staff });

    return {
        getStaffs: {
            key: getStaffsQueryKey,
            query: getStaffs
        },
        getStaff: {
            key: getStaffQueryKey,
            query: getStaff
        },
        addStaff: {
            key: addStaffMutationKey,
            mutation: addStaff
        },
        deleteStaff: {
            key: deleteStaffMutationKey,
            mutation: deleteStaff
        },
        updateStaff: {
            key: updateStaffMutationKey,
            mutation: updateStaff
        }
    }
}