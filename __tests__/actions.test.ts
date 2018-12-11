import {
  RESOURCE_FAILED,
  RESOURCE_INIT,
  RESOURCE_REQUESTED,
  RESOURCE_SUCCEEDED,
  resourceActions,
} from "../src";

describe("Resource Action Generators", () => {

  const resourceType = "sampleResourceType";

  const params = {
    id: "sampleId",
  };

  const data = {
    message: "sampleMessage",
  };

  it("should generate resource requested action", () => {
    const action = resourceActions.resourceRequested(resourceType, params);
    expect(action).toEqual({
      type: RESOURCE_REQUESTED,
      payload: {
        params,
        resourceType,
      },
    });
  });

  it("should generate resource succeeded action", () => {
    const action = resourceActions.resourceSucceeded(resourceType, data);
    expect(action).toEqual({
      type: RESOURCE_SUCCEEDED,
      payload: {
        data,
        resourceType,
      },
    });
  });

  it("should generate resource failed action", () => {
    const error = new Error("error");
    const action = resourceActions.resourceFailed(resourceType, error);
    expect(action).toEqual({
      type: RESOURCE_FAILED,
      payload: {
        error,
        resourceType,
      },
    });
  });

  it("should generate resource init action", () => {
    const action = resourceActions.resourceInit(resourceType);
    expect(action).toEqual({
      type: RESOURCE_INIT,
      payload: {
        resourceType,
      },
    });
  });

});
