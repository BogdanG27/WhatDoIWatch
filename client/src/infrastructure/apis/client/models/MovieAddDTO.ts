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
 * @interface MovieAddDTO
 */
export interface MovieAddDTO {
    /**
     * 
     * @type {string}
     * @memberof MovieAddDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MovieAddDTO
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof MovieAddDTO
     */
    releaseDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof MovieAddDTO
     */
    language?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MovieAddDTO
     */
    genre?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MovieAddDTO
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {number}
     * @memberof MovieAddDTO
     */
    rating?: number;
    /**
     * 
     * @type {number}
     * @memberof MovieAddDTO
     */
    numberOfRatings?: number;
    /**
     * 
     * @type {string}
     * @memberof MovieAddDTO
     */
    duration?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof MovieAddDTO
     */
    actorsIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof MovieAddDTO
     */
    staffMembersIds?: Array<string> | null;
}

/**
 * Check if a given object implements the MovieAddDTO interface.
 */
export function instanceOfMovieAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MovieAddDTOFromJSON(json: any): MovieAddDTO {
    return MovieAddDTOFromJSONTyped(json, false);
}

export function MovieAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MovieAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'releaseDate': !exists(json, 'releaseDate') ? undefined : (new Date(json['releaseDate'])),
        'language': !exists(json, 'language') ? undefined : json['language'],
        'genre': !exists(json, 'genre') ? undefined : json['genre'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'numberOfRatings': !exists(json, 'numberOfRatings') ? undefined : json['numberOfRatings'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'actorsIds': !exists(json, 'actorsIds') ? undefined : json['actorsIds'],
        'staffMembersIds': !exists(json, 'staffMembersIds') ? undefined : json['staffMembersIds'],
    };
}

export function MovieAddDTOToJSON(value?: MovieAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'releaseDate': value.releaseDate === undefined ? undefined : (value.releaseDate.toISOString()),
        'language': value.language,
        'genre': value.genre,
        'imageUrl': value.imageUrl,
        'rating': value.rating,
        'numberOfRatings': value.numberOfRatings,
        'duration': value.duration,
        'actorsIds': value.actorsIds,
        'staffMembersIds': value.staffMembersIds,
    };
}
