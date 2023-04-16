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
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { StaffDTOPagedResponse } from './StaffDTOPagedResponse';
import {
    StaffDTOPagedResponseFromJSON,
    StaffDTOPagedResponseFromJSONTyped,
    StaffDTOPagedResponseToJSON,
} from './StaffDTOPagedResponse';

/**
 * 
 * @export
 * @interface StaffDTOPagedResponseRequestResponse
 */
export interface StaffDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {StaffDTOPagedResponse}
     * @memberof StaffDTOPagedResponseRequestResponse
     */
    response?: StaffDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof StaffDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the StaffDTOPagedResponseRequestResponse interface.
 */
export function instanceOfStaffDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StaffDTOPagedResponseRequestResponseFromJSON(json: any): StaffDTOPagedResponseRequestResponse {
    return StaffDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function StaffDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): StaffDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : StaffDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function StaffDTOPagedResponseRequestResponseToJSON(value?: StaffDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': StaffDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}
