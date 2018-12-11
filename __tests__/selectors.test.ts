import { resourceSelectors } from "../src/index";
import { Resource } from "../src/types";

describe("Resource Selectors", () => {

  const error = new Error("sample error");
  const resources: { [key: string]: Resource<any> } = {
    nonBusyResource: {
      isBusy: false,
    },
    busyResource: {
      isBusy: true,
    },
    errorResource: {
      error,
      isBusy: false,
    },
    dataResource: {
      isBusy: false,
      data: "sampleData",
    },
  };

  it("isBusy", () => {
    expect(resourceSelectors.isBusy(resources, "nonBusyResource")).toBeFalsy();
    expect(resourceSelectors.isBusy(resources, "busyResource")).toBeTruthy();
  });

  it("getError", () => {
    expect(resourceSelectors.getError(resources, "nonBusyResource")).toEqual(undefined);
    expect(resourceSelectors.getError(resources, "errorResource")).toEqual(error);
  });

  it("getData", () => {
    expect(resourceSelectors.getData(resources, "errorResource")).toBeUndefined();
    expect(resourceSelectors.getData(resources, "dataResource")).toEqual("sampleData");
  });
});
