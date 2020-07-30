import {
  interfaces,
  TYPE,
  controller,
  httpGet,
  TAGS,
  inject,
  provideThrowable
} from '../config/ioc';
import { Context } from 'koa';

@controller('/api/sse')
@provideThrowable(TYPE.Controller, 'ServerSentEventController')
export default class ServerSentEventController implements interfaces.Controller {
  private sseService;
  constructor(@inject(TAGS.SSEService) sseService) {
    this.sseService = sseService;
  }
  @httpGet('/:event')
  private getSSE(
    ctx: Context,
    next: () => Promise<any>
  ) {
    const { event } = ctx.params;
    ctx.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    // 'Access-Control-Allow-Origin': '*',
    // const sse = this.sseService.getSSEInstanceByInterval(event);
    const sse = this.sseService.getSSEInstance(event);
    let times = 0;
    const timer = setInterval(() => {
      sse.continueWriteStream(`task: ${++times}`);
    }, 3000);
    ctx.body = sse.stream;

  }

}
