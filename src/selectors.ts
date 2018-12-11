import { ResourceType } from "./actions";
import { ResourceStoreState } from "./types";

export function getData(resources: ResourceStoreState, resourceType: ResourceType) {
    if (resources && resources[resourceType]) {
        return resources[resourceType].data;
    }

    return undefined;
}

export function isBusy(resources: ResourceStoreState, resourceType: ResourceType) {
    if (resources && resources[resourceType]) {
        return resources[resourceType].isBusy;
    }

    return undefined;
}

export function getError(resources: ResourceStoreState, resourceType: ResourceType) {
    if (resources && resources[resourceType]) {
        return resources[resourceType].error;
    }

    return undefined;
}
