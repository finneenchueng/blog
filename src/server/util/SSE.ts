import { PassThrough } from 'stream';
import { ISSEMsg } from '../interface/ISseService';


const instanceMap = new Map()
let uid = 0

/**
 * Server Sent Events encapsulation
 */
export class SSE {
    public stream: PassThrough;
    public uid: number;
    public retryTime: number = 5000;
    public intervalTime: number;
    private times: number = 0;
    public dataCallBack: (times?: number) => any;
    /**
     * in the constructor, the transformation flow, identity and initialization method are initialized
     */
    constructor(options: { [key: string]: any } = {}) {
        this.stream = new PassThrough();
        this.uid = ++uid;
        if(options){
            this.intervalTime = options.intervalTime;
            this.dataCallBack = options.intervalCall;
            this.retryTime = options.retryTime;
        }
        this.init();
    }
    /**
     * get SSE instance according to uid
     */
    static getInstance(uid) {
        return instanceMap.get(+uid)
    }
    /**
     * send custom events based on uid
     */
    static writeStream(uid, event, data) {
        const instance = this.getInstance(uid)

        if (instance) instance.writeStream(event, data)
    }

    private writeStreamByKeys(opts: string | ISSEMsg) {
        try{
            if(typeof opts === 'string'){
                this.stream.write(opts);
                return;
            }
            for(let key in opts as ISSEMsg){
                let preChars = '\n';
                if(key === 'data'){
                    preChars = '\n\n';
                }
                this.stream.write(`${key}: ${opts[key]}${preChars}`);
            }
        } catch(e){
            this.stream = new PassThrough();
            this.writeStreamByKeys(opts);
        }
        
    }

    /**
     * the initialization function records the current instance and keeps a long connection
     */
    private init() {
        instanceMap.set(this.uid, this);
        if(this.intervalTime){
            const timer = setInterval(() => {
                this.times++;
                this.writeKeepAliveStream();
            }, this.intervalTime);
            this.stream.on('close', () => {
                clearInterval(timer);
                instanceMap.delete(this.uid);
            })
        }

        
    }

    /**
     * keep a long connection by sending a comment message
     */
    private writeKeepAliveStream() {
        this.writeStreamByKeys(`id: ${this.uid}.${this.times}\n`);
        if(this.dataCallBack){
            const result = this.dataCallBack(this.times);
            this.writeStreamByKeys(`data: ${result}\n\n`);
            return;
        }
        this.writeStreamByKeys(': \n\n');
    }
    /**
     * send custom event
     */
    public writeStream(event, data) {
        const payload = typeof data === 'string' ? data : JSON.stringify(data);
        this.writeStreamByKeys({
            retry: this.retryTime,
            event,
            id: `${this.uid}.${this.times}`,
            data: payload
        });
    }
    
    public continueWriteStream(data){
        this.times++;
        this.writeStreamByKeys({
            id: `${this.uid}.${this.times}`,
            data
        });
        
    }
}