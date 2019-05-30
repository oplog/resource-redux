import { call, put, takeEvery } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";
import { resourceActions, resourceStore, ResourceStoreOptions, RESOURCE_REQUESTED } from "../src";

describe("Sagas -> resource", () => {
  const resourceType = "sampleResourceType";
  const failedResourceType = "sampleFailResourceType";
  const sampleData = { data: "sampleData" };
  const params = { id: "sampleId" };
  const error: any = { message: "test", code: 0 };
  const requestFunc = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(sampleData);
    });
  });
  const failRequest = jest.fn(() => {
    throw error;
  });
  const options: ResourceStoreOptions = {
    httpRequestMap: {
      [resourceType]: requestFunc,
      [failedResourceType]: failRequest,
    },
  };
  const resStore = resourceStore(options);

  it("resourceStoreOptions", () => {
    expect(resStore.requestHttpResource).toBeTruthy();
    expect(resStore.requestResource).toBeTruthy();
    expect(resStore.resourceSaga).toBeTruthy();
  });

  describe("requestResource", () => {
    it("should dispatch succeed action", () => {
      const gen = cloneableGenerator(resStore.requestResource)(
        resourceActions.resourceRequested(resourceType, params),
      );

      expect(gen.next().value).toEqual(
        call(resStore.requestHttpResource, resourceType, params),
      );

      expect(gen.next(sampleData).value).toEqual(
        put(resourceActions.resourceSucceeded(resourceType, sampleData)),
      );
    });

    it("should give error when invalid", () => {
      const gen = cloneableGenerator(resStore.requestResource)(
        resourceActions.resourceRequested(failedResourceType, params),
      );

      expect(gen.next().value).toEqual(
        call(resStore.requestHttpResource, failedResourceType, params),
      );

      expect(gen).toBeTruthy();
      expect(gen.throw).toBeTruthy();

      const err = {
        json: () => {
          return { error };
        },
        error: { ...error },
      };

      if (gen !== undefined && gen.throw !== undefined) {
        expect(gen.throw(err).value).toEqual(
          { error },
        );
      }

    });

    it("should throw error when request map is not defined", () => {
      const invalidResourceType = "invalidResourceType";
      const gen = cloneableGenerator(resStore.requestResource)(
        resourceActions.resourceRequested(invalidResourceType, params),
      );

      expect(gen.next().value).toEqual(
        call(resStore.requestHttpResource, invalidResourceType, params),
      );

      expect(() => {
        gen.next(resStore.requestHttpResource(invalidResourceType, params));
      }).toThrow();
    });
  });

  describe("resourceSaga", () => {
    it("should take actions", () => {
      const gen = cloneableGenerator(resStore.resourceSaga)();

      expect(gen.next().value).toEqual(
        takeEvery(RESOURCE_REQUESTED, resStore.requestResource),
      );
    });
  });
});
