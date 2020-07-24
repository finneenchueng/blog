import { TAGS,inject, provide } from '../config/ioc';
import { IPage } from '../interface/IPageService';
import { Model } from '../model/User';
import TYPES from '../constant/TYPES';
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

  public async getLocationAddrByIp(ip: string): Promise<{[key: string]: string}> {
    const ipResult = await this.safeRequest.fetch('http://ipaddr.cz88.net/data.php', { params: { ip } });
    const realStr = ipResult.result.substring(ipResult.result.indexOf('('),ipResult.result.indexOf(')'));
    const _arr = realStr.substr(1).replace(new RegExp("'", 'g'), '').split(',')
    return {
      ip,
      addr: _arr[1],
      info: _arr[2]
    };
  }

  public async getUser(id: string): Promise<Model.User> {
    let result: Model.User;
    result = this.userStorage[id];
    return result;
  }
}
