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


import * as runtime from '../runtime';
import type {
  MovieAddDTO,
  MovieDTOPagedResponseRequestResponse,
  MovieDTORequestResponse,
  MovieUpdateDTO,
  RequestResponse,
} from '../models';
import {
    MovieAddDTOFromJSON,
    MovieAddDTOToJSON,
    MovieDTOPagedResponseRequestResponseFromJSON,
    MovieDTOPagedResponseRequestResponseToJSON,
    MovieDTORequestResponseFromJSON,
    MovieDTORequestResponseToJSON,
    MovieUpdateDTOFromJSON,
    MovieUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiMovieAddPostRequest {
    movieAddDTO?: MovieAddDTO;
}

export interface ApiMovieDeleteIdDeleteRequest {
    id: string;
}

export interface ApiMovieGetByIdIdGetRequest {
    id: string;
}

export interface ApiMovieGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiMovieUpdatePutRequest {
    movieUpdateDTO?: MovieUpdateDTO;
}

/**
 * 
 */
export class MovieApi extends runtime.BaseAPI {

    /**
     */
    async apiMovieAddPostRaw(requestParameters: ApiMovieAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Movie/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MovieAddDTOToJSON(requestParameters.movieAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiMovieAddPost(requestParameters: ApiMovieAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiMovieAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiMovieDeleteIdDeleteRaw(requestParameters: ApiMovieDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiMovieDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Movie/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiMovieDeleteIdDelete(requestParameters: ApiMovieDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiMovieDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiMovieGetByIdIdGetRaw(requestParameters: ApiMovieGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MovieDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiMovieGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Movie/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MovieDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiMovieGetByIdIdGet(requestParameters: ApiMovieGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MovieDTORequestResponse> {
        const response = await this.apiMovieGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiMovieGetPageGetRaw(requestParameters: ApiMovieGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MovieDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Movie/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MovieDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiMovieGetPageGet(requestParameters: ApiMovieGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MovieDTOPagedResponseRequestResponse> {
        const response = await this.apiMovieGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiMovieUpdatePutRaw(requestParameters: ApiMovieUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Movie/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: MovieUpdateDTOToJSON(requestParameters.movieUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiMovieUpdatePut(requestParameters: ApiMovieUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiMovieUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
