import { TAGS,inject, provide } from '../config/ioc';
import { IPage } from '../interface/IPageService';
import { Model } from '../model/User';
import TYPES from '../constant/TYPES';
import * as fetch from "node-fetch";
@provide(TAGS.PageService)
export class PageService implements IPage {
  private safeRequest;
  constructor(@inject(TYPES.SafeRequest) SafeRequest) {
    this.safeRequest = SafeRequest;
  }

  private userStorage: Model.User[] = [
    {
      email: 'yuanzhijia@yidengfe.com',
      name: 'zhijia'
    },
    {
      email: 'Copyright © 2016 yidengfe.com All Rights Reversed.京ICP备16022242号-1',
      name: 'laowang'
    }
  ];

  public async getUser(id: string): Promise<Model.User> {
    let result: Model.User;
    result = this.userStorage[id];
    const arr = ['119.137.55.26','119.137.55.46','49.107.23.46','89.121.51.36','209.227.15.16'];
    const ipResult = await this.safeRequest.fetch('http://ipaddr.cz88.net/data.php', { params: { ip: arr[0]} });
    console.log('ipResult:', ipResult)
    const realStr = ipResult.result.substring(ipResult.result.indexOf('('),ipResult.result.indexOf(')'));
    const _arr = realStr.substr(1).replace(new RegExp("'", 'g'), '').split(',')
    console.log(_arr[0])
    console.log(_arr[1])
    console.log(_arr[2])
    // const ipResult = await this.safeRequest.fetch('https://integ3.ginolegaltech.com/product_version?time=0.4589753294174186');
    // console.log('ipResult:', ipResult)

    return result;
  }
}
