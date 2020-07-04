import * as Koa from 'koa';
import { Logger } from "log4js";
// import { Context } from "koa";
import { join } from 'path';
import { createReadStream } from 'fs';
const errorHandler = {
  error(app: Koa) {
    // interface KOAContext extends Context {
    //   // typeof logger;
    //   logger: Logger;
    // }
    app.use(async (ctx, next: () => Promise<any>) => {
      const _method = ctx.request.method.toUpperCase();
      console.log('_method:',_method)
      try {
        await next();
        console.log('000_method:','none....')
        const status = ctx.status || 404;
        if (status === 404) {
          ctx.status = 404;
          if (_method === 'GET') {
            // ctx.type = 'html';
            // ctx.body = createReadStream(join(__dirname, '../public/404/index.html'));
            ctx.body = { error: "the reqeust is gone!" };
          } else if (_method === 'POST') {
            ctx.body = { error: "the reqeust is gone!" };
          }
        }
      } catch (error) {
        // error logs pm2 logs
        ctx.logger.error(error);
        ctx.status = error.status || 500;
        if (ctx.status === 500) {
          if (_method === 'GET') {
            // ctx.type = 'html';
            // ctx.body = createReadStream(join(__dirname, '../public/500/index.html'));
            ctx.body = { error: "sorry,the server is found error!" };
          } else if (_method === 'POST') {
            ctx.body = { error: "sorry,the server is found error!" };
          }
        }

      }


    });
  }
};
export default errorHandler;
