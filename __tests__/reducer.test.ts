import { resourceActions, resourceReducer } from "../src/index";

describe("Resource Reducer", () => {

  const resourceType = "productDetails";

  const initialState = {
    [resourceType]: {
      isBusy: false,
      error: undefined,
      data: undefined,
      isSuccess: undefined
    },
  };

  it("should return initial state on default action", () => {
    const state = resourceReducer(initialState, {} as resourceActions.ResourceAction);
    expect(state[resourceType]).toEqual({
      isBusy: false,
      error: undefined,
      data: undefined,
      isSuccess: undefined
    });
  });

  it("should return correct state on request action", () => {
    const action = resourceActions.resourceRequested(resourceType, { id: "sampleUserId" });
    const state = resourceReducer(initialState, action);
    expect(state[resourceType]).toEqual({
      isSuccess: undefined,
      isBusy: true
    });
  });

  it("should return correct state on succeeded action", () => {
    const action = resourceActions.resourceSucceeded(resourceType, { id: "sampleUserId" });
    const state = resourceReducer(initialState, action);
    expect(state[resourceType]).toEqual({
      isBusy: false,
      isSuccess: true,
      data: {
        id: "sampleUserId"
      },
    });
  });

  it("should return correct state on error action", () => {
    const error = { message: "sample error", code: 0 };
    const action = resourceActions.resourceFailed(resourceType, error);
    const state = resourceReducer(initialState, action);
    expect(state[resourceType]).toEqual({
      isBusy: false,
      error,
      data: undefined,
      isSuccess: false
    });
  });

  it("should init resource state on init action", () => {
    const resType = "newResource";
    const action = resourceActions.resourceInit(resType);
    const state = resourceReducer(initialState, action);
    expect(state[resType]).toEqual({
      isBusy: false,
      data: undefined,
      error: undefined,
      isSuccess: undefined
    });
  });

  it("should return default state on non reducer action", () => {
    const action = {} as resourceActions.ResourceAction;
    const state = resourceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });
});
