import { SSE } from '../util/SSE';
export interface ISSE{
  getSSEInstance: (eventType: string) => SSE;
}

type Idata = {
  [key: string]: string | number | boolean | unknown | Idata;
}

export interface ISSEMsg {
  id?: string | number;
  event?: string;
  retry?: number;
  data: string | number | boolean | unknown | Idata;
}