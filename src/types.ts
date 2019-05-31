export interface ResourceStoreOptions {
  httpRequestMap: { [key: string]: (params: RequestParams) => void };
}

export interface RequestParams {
  [key: string]: any;
}

export type ResourceStoreState = ({ [key: string]: Resource<any> });

export interface Resource<T> {
  data?: T;
  error?: any;
  isBusy: boolean;
}
