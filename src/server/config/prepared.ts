import * as Koa from "koa";
import * as bodyParser from 'koa-bodyparser';
import { getLogger } from 'log4js';
import errorHandler from '../util/errorHandler';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import co from 'co';
import * as render from 'koa-swig';
import * as serve from 'koa-static';
import './ioc/inversify.config';
import basic from './basic';
import { initialDb } from '../db/install';

export function preConfig(app: Koa){
  initialDb();
  app.context.logger = getLogger('cheese');
  errorHandler.error(app);
  app.use(bodyParser());
  app.context.render = co.wrap(
    render({
      root: basic.viewDir,
      autoescape: true,
      cache: 'memory', // disable, set to false
      ext: 'html',
      varControls: ['[[', ']]'],
      writeBody: false
    })
  );
  app.use(serve(basic.staticDir)); // 静态资源文件
  // handle fallback for HTML5 history API
  // 增加了白名单选项， 插件默认会将所有的请求都指向到index.html
  // app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
}

export function preErrConfig(app: Koa){
  app.on('error', (err, next) => {
    console.log('系统初始化检查报警', err);
  });
}