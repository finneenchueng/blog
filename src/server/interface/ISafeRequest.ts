export interface ISafeRequest {
  fetch(url: string, arg?: Object, callback?: Function): Promise<Object>;
}

export type IPrams = {
  [key: string]: string | number | boolean | unknown | IPrams;
}

export type IFetchParams = {
  requestUrl: string;
} & IPrams;

export type ITransOption = {
  params?: IPrams;
  fd: typeof FormData;
  isJson?: boolean;
  method?: string;
  headers?: IPrams;
}