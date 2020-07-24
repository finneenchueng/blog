import {
  interfaces,
  TYPE,
  controller,
  httpGet,
  TAGS,
  Router,
  inject,
  provideThrowable
} from '../config/ioc';
import { Model } from '../model/User';
@controller('/')
@provideThrowable(TYPE.Controller, 'PageController')
export default class PageController implements interfaces.Controller {
  private pageService;
  constructor(@inject(TAGS.PageService) pageService) {
    this.pageService = pageService;
  }
  @httpGet('/')
  private async index(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const result: Model.User = await this.pageService.getUser(1);
    console.log('result:', result)
    ctx.body = await ctx.render('index', { data: result.email });
  }
}
