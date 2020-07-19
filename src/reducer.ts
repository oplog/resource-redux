import { ResourceAction, ResourceFailed, ResourceSucceeded } from "./actions";
import { RESOURCE_FAILED, RESOURCE_INIT, RESOURCE_REQUESTED, RESOURCE_SUCCEEDED } from "./constants";
import { ResourceStoreState } from "./types";

export function resourceReducer(
    state: ResourceStoreState,
    action: ResourceAction,
): ResourceStoreState {

    if (action === undefined || action.payload === undefined || action.payload.resourceType === undefined) {
        return state;
    }

    const resourceType = action.payload.resourceType;
    switch (action.type) {
        case RESOURCE_REQUESTED:
            return {
                ...state,
                [resourceType]: {
                    isBusy: true,
                    isSuccess: undefined,
                    error: undefined,
                    data: undefined,
                },
            };
        case RESOURCE_FAILED:
            const error = (action as ResourceFailed).payload.error;
            console.log(action);
            return {
                ...state,
                [resourceType]: {
                    isBusy: false,
                    isSuccess: false,
                    error,
                    data: state[resourceType].data,
                },
            };
        case RESOURCE_SUCCEEDED:
            const data = (action as ResourceSucceeded).payload.data;
            return {
                ...state,
                [resourceType]: {
                    isBusy: false,
                    isSuccess: true,
                    error: undefined,
                    data,
                },
            };
        case RESOURCE_INIT: {
            return {
                ...state,
                [resourceType]: {
                    isBusy: false,
                    isSuccess: undefined,
                    data: undefined,
                    error: undefined,
                },
            };
        }
        default:
            return state;
    }
}
