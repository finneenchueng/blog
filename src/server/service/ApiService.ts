import { TAGS,inject, provide } from "../config/ioc";
import { IApi } from "../interface/IApi";
import TYPES from "../constant/TYPES";
import { getUser } from "../db/operator";

@provide(TAGS.ApiService)
export class ApiService implements IApi {
  private safeRequest;
  constructor(@inject(TYPES.SafeRequest) SafeRequest) {
    this.safeRequest = SafeRequest;
  }
  public getInfo(url: string, arg?: Object, callback?: Function): Promise<Object> {
   return this.safeRequest.fetch(url,arg,callback);
  }
  public async getAdmin(): Promise<Object> {
    const result = await getUser();
    return result;
   }
}
