/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { GenderEnum } from './GenderEnum';
import {
    GenderEnumFromJSON,
    GenderEnumFromJSONTyped,
    GenderEnumToJSON,
} from './GenderEnum';
import type { StaffTypeEnum } from './StaffTypeEnum';
import {
    StaffTypeEnumFromJSON,
    StaffTypeEnumFromJSONTyped,
    StaffTypeEnumToJSON,
} from './StaffTypeEnum';

/**
 * 
 * @export
 * @interface StaffAddDTO
 */
export interface StaffAddDTO {
    /**
     * 
     * @type {string}
     * @memberof StaffAddDTO
     */
    firstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StaffAddDTO
     */
    lastName?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof StaffAddDTO
     */
    birthdate?: Date;
    /**
     * 
     * @type {GenderEnum}
     * @memberof StaffAddDTO
     */
    gender?: GenderEnum;
    /**
     * 
     * @type {StaffTypeEnum}
     * @memberof StaffAddDTO
     */
    type?: StaffTypeEnum;
}

/**
 * Check if a given object implements the StaffAddDTO interface.
 */
export function instanceOfStaffAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StaffAddDTOFromJSON(json: any): StaffAddDTO {
    return StaffAddDTOFromJSONTyped(json, false);
}

export function StaffAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StaffAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'firstName': !exists(json, 'firstName') ? undefined : json['firstName'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
        'birthdate': !exists(json, 'birthdate') ? undefined : (new Date(json['birthdate'])),
        'gender': !exists(json, 'gender') ? undefined : GenderEnumFromJSON(json['gender']),
        'type': !exists(json, 'type') ? undefined : StaffTypeEnumFromJSON(json['type']),
    };
}

export function StaffAddDTOToJSON(value?: StaffAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'firstName': value.firstName,
        'lastName': value.lastName,
        'birthdate': value.birthdate === undefined ? undefined : (value.birthdate.toISOString()),
        'gender': GenderEnumToJSON(value.gender),
        'type': StaffTypeEnumToJSON(value.type),
    };
}
