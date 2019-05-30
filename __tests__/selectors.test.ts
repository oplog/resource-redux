import { resourceSelectors } from "../src/index";
import { Resource } from "../src/types";

describe("Resource Selectors", () => {

  const error: any = { message: "test", code: 0 };
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
    completeErrorResource: {
      isBusy: false,
      error,
    },
    completeDataResource: {
      isBusy: false,
      data: "sampleData",
    },
  };

  describe("getResource", () => {
    it("should return resource", () => {
      expect(resourceSelectors.getResource(resources, "nonBusyResource")).toBeTruthy();
    });

    it("should return undefined on non-existing resource", () => {
      expect(resourceSelectors.getResource(resources, "nonExistingResource")).toBeFalsy();
    });
  });

  describe("getData", () => {
    it("should return data", () => {
      expect(resourceSelectors.getData(resources, "dataResource")).toBeTruthy();
    });

    it("should not return data non-existing resource", () => {
      expect(resourceSelectors.getData(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return undefined with existing resource but no data", () => {
      expect(resourceSelectors.getData(resources, "nonBusyResource")).toBeFalsy();
    });
  });

  describe("hasData", () => {
    it("should return data", () => {
      expect(resourceSelectors.hasData(resources, "dataResource")).toBeTruthy();
    });

    it("should not return data non-existing resource", () => {
      expect(resourceSelectors.hasData(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return undefined with existing resource but no data", () => {
      expect(resourceSelectors.hasData(resources, "nonBusyResource")).toBeFalsy();
    });
  });

  describe("isBusy", () => {
    it("should return true on busy resource", () => {
      expect(resourceSelectors.isBusy(resources, "busyResource")).toBeTruthy();
    });

    it("should return false on non-existing resource", () => {
      expect(resourceSelectors.hasData(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return false on non busy resource", () => {
      expect(resourceSelectors.isBusy(resources, "nonBusyResource")).toBeFalsy();
    });
  });

  describe("getError", () => {
    it("should return error on error resource", () => {
      expect(resourceSelectors.getError(resources, "errorResource")).toBeTruthy();
      expect(resourceSelectors.getError(resources, "errorResource")).toEqual(error);
    });

    it("should return false on non-existing resource", () => {
      expect(resourceSelectors.getError(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return false on non busy resource", () => {
      expect(resourceSelectors.getError(resources, "nonBusyResource")).toBeFalsy();
    });
  });

  describe("hasError", () => {
    it("should return true on error resource", () => {
      expect(resourceSelectors.hasError(resources, "errorResource")).toBeTruthy();
    });

    it("should return false on non-existing resource", () => {
      expect(resourceSelectors.hasError(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return false on non error resource", () => {
      expect(resourceSelectors.hasError(resources, "nonBusyResource")).toBeFalsy();
    });
  });

  describe("getData", () => {
    it("should return data on data resource", () => {
      expect(resourceSelectors.getData(resources, "dataResource")).toBeTruthy();
      expect(resourceSelectors.getData(resources, "dataResource")).toEqual("sampleData");
    });

    it("should return undefined on non-existing resource", () => {
      expect(resourceSelectors.hasError(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return undefined on non data resource", () => {
      expect(resourceSelectors.getData(resources, "errorResource")).toBeFalsy();
    });
  });

  describe("isComplete", () => {
    it("should return true on complete resource", () => {
      expect(resourceSelectors.isComplete(resources, "completeErrorResource")).toBeTruthy();
      expect(resourceSelectors.isComplete(resources, "completeDataResource")).toBeTruthy();
    });

    it("should return false on non-existing resource", () => {
      expect(resourceSelectors.isComplete(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return false on non-complete resource", () => {
      expect(resourceSelectors.isComplete(resources, "busyResource")).toBeFalsy();
    });
  });

  describe("isSuccessComplete", () => {
    it("should return true on complete success resource", () => {
      expect(resourceSelectors.isSuccessComplete(resources, "completeDataResource")).toBeTruthy();
    });

    it("should return false on non-existing resource", () => {
      expect(resourceSelectors.isSuccessComplete(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return false on non-complete-success resource", () => {
      expect(resourceSelectors.isSuccessComplete(resources, "busyResource")).toBeFalsy();
    });
  });

  describe("isErrorComplete", () => {
    it("should return true on complete error resource", () => {
      expect(resourceSelectors.isErrorComplete(resources, "completeErrorResource")).toBeTruthy();
    });

    it("should return false on non-existing resource", () => {
      expect(resourceSelectors.isErrorComplete(resources, "nonExistingResource")).toBeFalsy();
    });

    it("should return false on non-error resource", () => {
      expect(resourceSelectors.isErrorComplete(resources, "busyResource")).toBeFalsy();
    });
  });

});
