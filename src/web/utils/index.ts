import pathConfig from './request'
import validator from './validator'
import compiles from '../../../server/logicCheck/compile';

function baseEncrypt(code) {
  return compiles.codeEncrypt(code);
}
function baseDecrypt(code) {
  return compiles.codeDecrypt(code);
}
function getPostParamOption(code) {
  return compiles.getPostParamOption(code);
}
function parseJsonResult(code) {
  return compiles.parseJsonResult(code);
}
function doValidator(validatorName) {
  return validator[validatorName];
}
function replaceLineBreak(content) {
  var str = content;
  str = str.replace(/(<br\/>)/g, "\n");
  str = str.replace(/(&nbsp;)/g, "  ");
  return str;
}
function getFormData(inputArray, isCheck) {
  var len = inputArray.length;
  var json = '{';
  var _index = 0;
  for (var i = 0; i < len; i++) {
    var cell_input = inputArray[i];
    var _name = cell_input.name;
    var _msg = '';
    var _value = '';
    // console.log(cell_input.type)
    // console.log(cell_input.tagName)
    if (cell_input.tagName == 'TEXTAREA') {
      _value = cell_input.innerText;
      // console.log(cell_input.innerText)
      // console.log(cell_input.value)
      if (_value == undefined || _value == '') {
        _value = cell_input.value;
      }
      var str = _value;
      //替换所有的换行符
      str = str.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
      str = str.replace(/\r\n/g, "<br/>");
      str = str.replace(/\n/g, "<br/>");
      str = str.replace(/\"/g, "\\\"");
      str = str.replace(/\\/g, "\\\\");
      // str=str.replace(new RegExp('(["\"])', 'g'), "\\\"");
      //替换所有的空格（中文空格、英文空格都会被替换）
      str = str.replace(/\s/g, "&nbsp;");
      _value = str;
    } else if (cell_input.tagName == 'SELECT') {
      var index = cell_input.selectedIndex;
      if (isCheck) {
        if (index > -1) {
          _value = cell_input.options[index].value;
        } else {
          return {name: _name, flag: true, validMsg: ''}
        }
      } else {
        if (index > -1) {
          _value = cell_input.options[index].value;
        }
      }

    } else if (cell_input.type == 'checkbox') {
      _value = cell_input.checked
        ? 1
        : 0;
    } else {
      _value = cell_input.value;
    }
    if (cell_input.getAttribute("data-decode-mark") == 1) {
      _value = baseEncrypt(_value);
    }
    if (_name) {
      if (_index > 0) {
        json += ',';
      }
      json += '"' + _name + '":"' + _value + '"';
      _index++;
    }
  }
  json += '}';
  return json;
}
function getMenuList() {
  return pathConfig.menuList;
}
function checkDevOrProdEnv() {
  return compiles.isProd;
  // document.querySelector('meta[name="mutate-app"]').getAttribute('content')

  // if(window.clientSetting==null||window.clientSetting==undefined){
  // 	return false;
  // }else{
  // 	return true;
  // }

  // if(document.querySelector('meta[name="^mutate-app-"]')==null){
  // 	return false;
  // }else{
  // 	return true;
  // }

}
function getPageInitData() {
  // document.querySelector('meta[name="mutate-app"]').getAttribute('content')
  var ele_metas = document.querySelectorAll('meta[name="^mutate-app-"]');
  var len = 0;
  var tmpArr = [];
  if (ele_metas != null) {
    len = ele_metas.length;
  }
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      var cur_ele = ele_metas[i];
      var cur_txt = cur_ele.getAttribute('content');
      tmpArr.push(cur_txt);
    }
    return tmpArr.join("");
  } else {
    return null;
  }

}
function getMenuJumpPath(key) {
  var falg = checkDevOrProdEnv();
  if (falg) {
    return pathConfig.prod[key];
  } else {
    return pathConfig.dev[key];
  }
}
function getBrowser() {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isiPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isiPhone && !isAndroid && !isSymbian;
  return {isTablet: isTablet, isiPhone: isiPhone, isAndroid: isAndroid, isPc: isPc};
}
function isBrowserSupport() {
  var isMyWebSupport = true;
  if (navigator.userAgent.indexOf("MSIE") > 0) {
    isMyWebSupport = false;
  } else if (!window.applicationCache) {
    isMyWebSupport = false;
  }
  // if(!isMyWebSupport){
  //   webBrowserNotSupport("为了您更好的体验，请升级到更高版本的浏览器");
  //   return;
  // }
  return isMyWebSupport;
}
function doSessionStorageItem(key, val) {
  if (!window.sessionStorage) {
    return undefined;
  }
  if (val == undefined) {
    return window.sessionStorage.getItem(key)
  } else {
    window.sessionStorage.setItem(key, val);
    return undefined;
  }
}

const toolkit = {
  baseEncrypt: baseEncrypt,
  baseDecrypt: baseDecrypt,
  getPostParamOption: getPostParamOption,
  parseJsonResult: parseJsonResult,
  doValidator: doValidator,
  replaceLineBreak: replaceLineBreak,
  getFormData: getFormData,
  getMenuList: getMenuList,
  checkDevOrProdEnv: checkDevOrProdEnv,
  getPageInitData: getPageInitData,
  getMenuJumpPath: getMenuJumpPath,
  getBrowser: getBrowser,
  isBrowserSupport: isBrowserSupport,
  doSessionStorageItem: doSessionStorageItem

};
export default toolkit
