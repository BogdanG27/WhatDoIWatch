import { useAppSelector } from "@application/store";
import { ApiActorGetPageGetRequest, ActorAddDTO, ActorApi, ActorUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getActorsQueryKey = "getActorsQuery";
const getActorQueryKey = "getActorQuery";
const addActorMutationKey = "addActorMutation";
const deleteActorMutationKey = "deleteActorMutation";
const updateActorMutationKey = "updateActorMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the actor API.
 */
export const useActorApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getActors = (page: ApiActorGetPageGetRequest) => new ActorApi(config).apiActorGetPageGet(page); // Use the generated client code and adapt it.
    const getActor = (id: string) => new ActorApi(config).apiActorGetByIdIdGet({ id });
    const addActor = (actor: ActorAddDTO) => new ActorApi(config).apiActorAddPost({ actorAddDTO: actor });
    const deleteActor = (id: string) => new ActorApi(config).apiActorDeleteIdDelete({ id });
    const updateActor = (actor: ActorUpdateDTO) => new ActorApi(config).apiActorUpdatePut({ actorUpdateDTO: actor });

    return {
        getActors: { // Return the query object.
            key: getActorsQueryKey, // Add the key to identify the query.
            query: getActors // Add the query callback.
        },
        getActor: {
            key: getActorQueryKey,
            query: getActor
        },
        addActor: { // Return the mutation object.
            key: addActorMutationKey, // Add the key to identify the mutation.
            mutation: addActor // Add the mutation callback.
        },
        deleteActor: {
            key: deleteActorMutationKey,
            mutation: deleteActor
        },
        updateActor: {
            key: updateActorMutationKey,
            mutation: updateActor
        }
    }
}