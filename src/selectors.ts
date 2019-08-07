import { ResourceType } from "./actions";
import { ResourceStoreState } from "./types";

export function getResource(resources: ResourceStoreState, resourceType: ResourceType) {
    if (resources && resources[resourceType]) {
        return resources[resourceType];
    }

    return undefined;
}

export function getData(resources: ResourceStoreState, resourceType: ResourceType) {
    const resource = getResource(resources, resourceType);
    if (resource && resource.data) {
        return resource.data;
    }

    return undefined;
}

export function hasData(resources: ResourceStoreState, resourceType: ResourceType) {
    const resource = getResource(resources, resourceType);
    if (resource && resource.data) {
        return resource.data !== undefined;
    }

    return false;
}

export function isBusy(resources: ResourceStoreState, resourceType: ResourceType) {
    const resource = getResource(resources, resourceType);
    if (resource && resource.isBusy) {
        return resource.isBusy;
    }

    return false;
}

export function getError(resources: ResourceStoreState, resourceType: ResourceType): any {
    const resource = getResource(resources, resourceType);
    if (resource && resource.error) {
        return resource.error;
    }

    return undefined;
}

export function hasError(resources: ResourceStoreState, resourceType: ResourceType) {
    const resource = getResource(resources, resourceType);
    if (resource && resource.error) {
        return resource.error !== undefined;
    }

    return false;
}

export function isComplete(resources: ResourceStoreState, resourceType: ResourceType) {
    return isSuccessComplete(resources, resourceType) || isErrorComplete(resources, resourceType);
}

export function isSuccessComplete(resources: ResourceStoreState, resourceType: ResourceType) {
    const resource = getResource(resources, resourceType);
    if (resource) {
        return !!resource.isSuccess;
    }
    return false;
}

export function isErrorComplete(resources: ResourceStoreState, resourceType: ResourceType) {
    const resource = getResource(resources, resourceType);
    if (resource && !isBusy(resources, resourceType) && hasError(resources, resourceType)) {
        return true;
    }
    return false;
}
