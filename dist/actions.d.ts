import { RESOURCE_FAILED, RESOURCE_INIT, RESOURCE_REQUESTED, RESOURCE_SUCCEEDED } from "./constants";
export declare type ResourceType = string;
export interface ResourceRequested {
    type: RESOURCE_REQUESTED;
    payload: {
        resourceType: ResourceType;
        accessToken?: string;
        params?: {
            [key: string]: any;
        };
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
export declare type ResourceAction = ResourceRequested | ResourceFailed | ResourceSucceeded | ResourceInit;
export declare function resourceRequested(resourceType: ResourceType, params?: {
    [key: string]: any;
}): ResourceRequested;
export declare function resourceSucceeded(resourceType: ResourceType, data: any): ResourceSucceeded;
export declare function resourceFailed(resourceType: ResourceType, error: any): ResourceFailed;
export declare function resourceInit(resourceType: ResourceType): ResourceInit;
