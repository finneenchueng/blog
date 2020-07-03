import { Model } from "../model/User";
export interface IPage {
  getUser(id: string): Promise<Model.User>;
}
