import { ResourceRequested } from "./actions";
import { RequestParams, ResourceStoreOptions } from "./types";
export declare function resourceStore(options: ResourceStoreOptions): {
    requestHttpResource: (resourceType: string, params: RequestParams) => void;
    requestResource: (action: ResourceRequested) => IterableIterator<any>;
    resourceSaga: () => IterableIterator<import("redux-saga/effects").ForkEffect>;
};
