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
 * @interface StaffDTO
 */
export interface StaffDTO {
    /**
     * 
     * @type {string}
     * @memberof StaffDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof StaffDTO
     */
    firstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StaffDTO
     */
    lastName?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof StaffDTO
     */
    birthdate?: Date;
    /**
     * 
     * @type {GenderEnum}
     * @memberof StaffDTO
     */
    gender?: GenderEnum;
    /**
     * 
     * @type {StaffTypeEnum}
     * @memberof StaffDTO
     */
    type?: StaffTypeEnum;
}

/**
 * Check if a given object implements the StaffDTO interface.
 */
export function instanceOfStaffDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StaffDTOFromJSON(json: any): StaffDTO {
    return StaffDTOFromJSONTyped(json, false);
}

export function StaffDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StaffDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'firstName': !exists(json, 'firstName') ? undefined : json['firstName'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
        'birthdate': !exists(json, 'birthdate') ? undefined : (new Date(json['birthdate'])),
        'gender': !exists(json, 'gender') ? undefined : GenderEnumFromJSON(json['gender']),
        'type': !exists(json, 'type') ? undefined : StaffTypeEnumFromJSON(json['type']),
    };
}

export function StaffDTOToJSON(value?: StaffDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'firstName': value.firstName,
        'lastName': value.lastName,
        'birthdate': value.birthdate === undefined ? undefined : (value.birthdate.toISOString()),
        'gender': GenderEnumToJSON(value.gender),
        'type': StaffTypeEnumToJSON(value.type),
    };
}
