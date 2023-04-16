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
import type { SeasonDTO } from './SeasonDTO';
import {
    SeasonDTOFromJSON,
    SeasonDTOFromJSONTyped,
    SeasonDTOToJSON,
} from './SeasonDTO';

/**
 * 
 * @export
 * @interface SeasonDTORequestResponse
 */
export interface SeasonDTORequestResponse {
    /**
     * 
     * @type {SeasonDTO}
     * @memberof SeasonDTORequestResponse
     */
    response?: SeasonDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof SeasonDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the SeasonDTORequestResponse interface.
 */
export function instanceOfSeasonDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SeasonDTORequestResponseFromJSON(json: any): SeasonDTORequestResponse {
    return SeasonDTORequestResponseFromJSONTyped(json, false);
}

export function SeasonDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SeasonDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : SeasonDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function SeasonDTORequestResponseToJSON(value?: SeasonDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': SeasonDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

