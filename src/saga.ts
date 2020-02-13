import { call, put, takeEvery } from "redux-saga/effects";
import { resourceFailed, ResourceRequested, resourceSucceeded, ResourceType } from "./actions";
import { RESOURCE_REQUESTED } from "./constants";
import { RequestParams, ResourceStoreOptions } from "./types";

export function resourceStore(options: ResourceStoreOptions) {
  const requestHttpResource = (
    resourceType: ResourceType,
    params: RequestParams,
  ) => {
    const request = options.httpRequestMap[resourceType];
    if (request === undefined) {
      const error = `Resource type "${resourceType}" is not mapped in http request map`;
      // tslint:disable-next-line:no-console
      console.error(error);
      throw new Error(error);
    }

    return request(params);
  };

  const requestResource = function*(action: ResourceRequested) {
    try {
      const response = yield call(
        requestHttpResource,
        action.payload.resourceType,
        {
          ...action.payload.params,
        },
      );
      yield put(resourceSucceeded(action.payload.resourceType, response));
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log({ e, action });
      let err = { message: "Unknown Error", code: 0 };
      try {
        const json = (yield e);
        err = json;
      } catch (jsonError) {
        err = jsonError;
      } finally {
        yield put(resourceFailed(action.payload.resourceType, err));
      }
    }
  };

  const resourceSaga = function*() {
    yield takeEvery(RESOURCE_REQUESTED, requestResource);
  };

  return {
    requestHttpResource,
    requestResource,
    resourceSaga,
  };
}
