import { ResourceRequested } from "./actions";
import { RequestParams, ResourceStoreOptions } from "./types";
export declare function resourceStore(options: ResourceStoreOptions): {
    requestHttpResource: (resourceType: string, params: RequestParams) => void;
    requestResource: (action: ResourceRequested) => Generator<any, void, unknown>;
    resourceSaga: () => Generator<import("redux-saga/effects").ForkEffect, void, unknown>;
};
