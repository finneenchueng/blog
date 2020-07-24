import { decode } from 'iconv-lite';
import { provide } from "../config/ioc";
import TYPES from "../constant/TYPES";
import { ISafeRequest, IPrams, IFetchParams, ITransOption } from "../interface/ISafeRequest";
import * as fetch from "node-fetch";


function prepareForFetchOpt(url: string, options?: ITransOption): IFetchParams {
  let opt = { method: 'get' };
  let newUrl = url;
  if (!options) {
    return {
      requestUrl: newUrl,
      option: opt
    };
  }
  const { fd, params, method, headers } = options;
  if (method) {
    opt = Object.assign(opt, { method });
  }
  const _method = opt.method.toLocaleLowerCase();
  if ((_method === 'get' || _method === 'head') && params) {
    let _url = newUrl.includes('?') ? '' : '&';
    for (const key in params) {
      _url += `&${key}=${params[key]}`;
    }
    newUrl += _url.replace('&&', '?');
  } else {
    if (fd || params) {
      opt = Object.assign(opt, { body: fd || JSON.stringify(params) });
    }
  }
  if (headers) {
    opt = Object.assign(opt, { headers });
  }
  return {
    requestUrl: newUrl,
    option: opt
  };
}
function analyzeHeaders(headers: any) {
  let newHeaders = {};
  if (!headers) {
    return newHeaders;
  }
  const headersSymbols = Object.getOwnPropertySymbols(headers);
  for (let i = 0, len = headersSymbols.length; i < len; i++) {
    const key = headersSymbols[i];
    if (headers[key]) {
      newHeaders = Object.assign(newHeaders, headers[key]);
    }
  }
  return newHeaders;
}
function getHeaderResult(opts, key?) {
  let itemString = null;
  if (Array.isArray(opts)) {
    for (let i = 0, len = opts.length; i < len; i++) {
      if (opts[i] === key || opts[i].includes(key)) {
        itemString = opts[i];
        break;
      }
    }
  }
  return itemString;
}
function checkHeaderProperty(headers: any, propertyName: string, compareVaule?: string): boolean | string {
  const _headers = headers[propertyName] ? headers : analyzeHeaders(headers);
  if (Array.isArray(_headers[propertyName])) {
    return compareVaule ? _headers[propertyName].includes(compareVaule) : _headers[propertyName].join(',');
  }
  return compareVaule ? _headers[propertyName] === compareVaule : _headers[propertyName];
}

function analyzedBodyBuffer(headers: any, { arg, bufferArray, totalSize }) {
  // checkHeaderProperty(headers, 'content-type', 'application/json')
  const _headers = analyzeHeaders(headers);
  const contentType = checkHeaderProperty(_headers, 'content-type') as string;
  const preContentTypes = ['application/json', 'text/html'];
  let charCoding = 'utf-8', result;
  for (let i = 0, len = preContentTypes.length; i < len; i++) {
    let typeString = getHeaderResult(contentType, preContentTypes[i]);
    if(!typeString && !contentType.includes(preContentTypes[i])){
        continue;
    }
    typeString = typeString || contentType;
    if (typeString.includes('charset')) {
      charCoding = typeString.split(';').filter((item) => {
        return item.includes('charset');
      })[0].split('=')[1];
    }
    result = decode(Buffer.concat(bufferArray, totalSize), charCoding);
    try{
      if (arg && arg.isJson) {
        result = JSON.parse(result);
      }
    } catch(e){}
    
    return result;
  }
  return null;
}
@provide(TYPES.SafeRequest)
export class SafeRequest implements ISafeRequest {
  public async fetch(
    url: string,
    arg?: ITransOption
  ): Promise<Object> {
    const { requestUrl, option } = prepareForFetchOpt(url, arg);
    return new Promise((resolve, reject) => {
      fetch(requestUrl, option)
        .then(res => {
          const { headers, body } = res;
          const bufferArray = [];
          let totalSize = 0;
          body.on('data', (chunk) => {
            // console.log(Buffer.isBuffer(chunk));
            bufferArray.push(chunk);
            totalSize += chunk.length;
          });
          body.on('end', (e) => {
            // console.log('e:', e) undefined
            const result = analyzedBodyBuffer(headers, { arg, bufferArray, totalSize });
            if (result) {
              resolve({
                errcode: 0,
                result,
              });
            } else {
              resolve({
                errcode: 0,
                result: bufferArray,
                size: totalSize,
              });
            }

          });
        }).catch(e => {
          resolve({
            errcode: 1,
            result: e,
          });
        });
    });
    
  }
}
