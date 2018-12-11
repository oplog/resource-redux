import { call, put, takeEvery } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";
import {
  RESOURCE_REQUESTED,
  resourceActions,
  resourceStore,
  ResourceStoreOptions
} from "../src";

describe("Sagas -> resource", () => {
  const resourceType = "sampleResourceType";
  const failedResourceType = "sampleFailResourceType";
  const sampleData = { data: "sampleData" };
  const params = { id: "sampleId" };
  const error = "sample error";
  const requestFunc = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(sampleData);
    });
  });
  const failRequest = jest.fn(() => {
    throw new Error(error);
  });
  const options: ResourceStoreOptions = {
    httpRequestMap: {
      [resourceType]: requestFunc,
      [failedResourceType]: failRequest
    }
  };
  const resourceSaga = resourceStore(options);

  describe("requestResource", () => {
    it("should dispatch succeed action", () => {
      const gen = cloneableGenerator(resourceSaga.requestResource)(
        resourceActions.resourceRequested(resourceType, params)
      );

      expect(gen.next().value).toEqual(
        call(resourceSaga.requestHttpResource, resourceType, params)
      );

      expect(gen.next(sampleData).value).toEqual(
        put(resourceActions.resourceSucceeded(resourceType, sampleData))
      );
    });

    it("should give error when invalid", () => {
      const gen = cloneableGenerator(resourceSaga.requestResource)(
        resourceActions.resourceRequested(failedResourceType, params)
      );

      expect(gen.next().value).toEqual(
        call(resourceSaga.requestHttpResource, failedResourceType, params)
      );

      expect(gen.throw(new Error(error)).value).toEqual(
        put(
          resourceActions.resourceFailed(failedResourceType, new Error(error))
        )
      );
    });

    it("should throw error when request map is not defined", () => {
      const invalidResourceType = "invalidResourceType";
      const gen = cloneableGenerator(resourceSaga.requestResource)(
        resourceActions.resourceRequested(invalidResourceType, params)
      );

      expect(gen.next().value).toEqual(
        call(resourceSaga.requestHttpResource, invalidResourceType, params)
      );

      expect(() => {
        gen.next(resourceSaga.requestHttpResource(invalidResourceType, params));
      }).toThrow();
    });
  });

  describe("resourceSaga", () => {
    it("should take actions", () => {
      const gen = cloneableGenerator(resourceSaga.resourceSaga)();

      expect(gen.next().value).toEqual(
        takeEvery(RESOURCE_REQUESTED, resourceSaga.requestResource)
      );
    });
  });
});
