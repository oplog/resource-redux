import { Resource } from "./types";

export const initialResourceState: Resource<any> = {
    isBusy: false,
    data: undefined,
    error: undefined,
    isSuccess: false,
};
