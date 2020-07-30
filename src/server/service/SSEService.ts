import { TAGS,inject, provide } from '../config/ioc';
import { ISSE } from '../interface/ISseService';
import { SSE } from '../util/SSE';

/**
 * Server Sent Events encapsulation
 */
@provide(TAGS.SSEService)
export class SSEService implements ISSE {
    public getSSEInstance(eventType: string){
        const sse = new SSE();
        sse.writeStream(eventType, '0');
        return sse;
    }
    public getSSEInstanceByInterval(eventType: string){
        const sse = new SSE({intervalCall: (times: number)=>{
            if(times % 2 === 0 ){
              return 'this is connection times:' + times;
            }
            return 'waiting';
          },intervalTime: 1000});
        sse.writeStream(eventType, '0');
        return sse;
    }
}