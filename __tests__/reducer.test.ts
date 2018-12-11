import {
  resourceActions,
  resourceReducer,
} from "../src/index";

describe("Resource Reducer", () => {

  const resourceType = "productDetails";

  const initialState = {
    [resourceType]: {
      isBusy: false,
      error: undefined,
      data: undefined,
    },
  };

  it("should return initial state on default action", () => {
    const state = resourceReducer(initialState, {} as resourceActions.ResourceAction);
    expect(state[resourceType]).toEqual({
      isBusy: false,
      error: undefined,
      data: undefined,
    });
  });

  it("should return correct state on request action", () => {
    const action = resourceActions.resourceRequested(resourceType, { id: "sampleUserId" });
    const state = resourceReducer(initialState, action);
    expect(state[resourceType]).toEqual({
      isBusy: true,
    });
  });

  it("should return correct state on succeeded action", () => {
    const action = resourceActions.resourceSucceeded(resourceType, { id: "sampleUserId" });
    const state = resourceReducer(initialState, action);
    expect(state[resourceType]).toEqual({
      isBusy: false,
      data: {
        id: "sampleUserId",
      },
    });
  });
});
