import { RESOURCE_FAILED, RESOURCE_INIT, RESOURCE_REQUESTED, RESOURCE_SUCCEEDED } from "./constants";

export type ResourceType = string;

export interface ResourceRequested {
    type: RESOURCE_REQUESTED;
    payload: {
        resourceType: ResourceType;
        accessToken?: string;
        params?: { [key: string]: any; };
    };
}

export interface ResourceSucceeded {
    type: RESOURCE_SUCCEEDED;
    payload: {
        resourceType: ResourceType;
        data: any;
    };
}

export interface ResourceFailed {
    type: RESOURCE_FAILED;
    payload: {
        resourceType: ResourceType;
        error: any;
    };
}

export interface ResourceInit {
    type: RESOURCE_INIT;
    payload: {
        resourceType: ResourceType;
    };
}

export type ResourceAction = ResourceRequested | ResourceFailed | ResourceSucceeded | ResourceInit;

export function resourceRequested(resourceType: ResourceType, params?: { [key: string]: any }): ResourceRequested {
    return {
        type: RESOURCE_REQUESTED,
        payload: {
            resourceType,
            params,
        },
    };
}

export function resourceSucceeded(resourceType: ResourceType, data: any): ResourceSucceeded {
    return {
        type: RESOURCE_SUCCEEDED,
        payload: {
            resourceType,
            data,
        },
    };
}

export function resourceFailed(resourceType: ResourceType, error: any): ResourceFailed {
    return {
        type: RESOURCE_FAILED,
        payload: {
            resourceType,
            error,
        },
    };
}

export function resourceInit(resourceType: ResourceType): ResourceInit {
    return {
        type: RESOURCE_INIT,
        payload: {
            resourceType,
        },
    };
}
