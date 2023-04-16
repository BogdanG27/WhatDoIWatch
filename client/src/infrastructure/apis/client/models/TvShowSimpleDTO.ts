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
/**
 * 
 * @export
 * @interface TvShowSimpleDTO
 */
export interface TvShowSimpleDTO {
    /**
     * 
     * @type {string}
     * @memberof TvShowSimpleDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof TvShowSimpleDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TvShowSimpleDTO
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TvShowSimpleDTO
     */
    rating?: number;
    /**
     * 
     * @type {number}
     * @memberof TvShowSimpleDTO
     */
    numberOfRatings?: number;
}

/**
 * Check if a given object implements the TvShowSimpleDTO interface.
 */
export function instanceOfTvShowSimpleDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TvShowSimpleDTOFromJSON(json: any): TvShowSimpleDTO {
    return TvShowSimpleDTOFromJSONTyped(json, false);
}

export function TvShowSimpleDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TvShowSimpleDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'numberOfRatings': !exists(json, 'numberOfRatings') ? undefined : json['numberOfRatings'],
    };
}

export function TvShowSimpleDTOToJSON(value?: TvShowSimpleDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'imageUrl': value.imageUrl,
        'rating': value.rating,
        'numberOfRatings': value.numberOfRatings,
    };
}
