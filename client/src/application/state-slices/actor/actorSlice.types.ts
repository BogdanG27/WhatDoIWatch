import { ActorDTO, GenderEnum } from "@infrastructure/apis/client";

export interface Actor {
    id: string,
    firstName: string,
    lastName: string,
    birthdate: Date,
    gender: GenderEnum,
    photoUrl: string
}

export type ActorState = {
    actorToUpdate: Actor
};
