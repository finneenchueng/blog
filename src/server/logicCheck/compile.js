// var base64 = require('./base64');
var crypto = require('crypto');
var config = require('./config.js');

var markApendStrLen = 5;
var outerParamKey = 'paramMsg';
var isProd = config.isProd;
var key_words = '工作 | 总结 | 发现 | 感悟 | 所见所闻 | 旅行 | 读书笔记';
var desc = '工作 | 总结 | 发现 | 感悟 | 所见所闻 | 旅行 | 读书笔记';

function getRandomSerialNumber (len) {
    var _key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    var _len = _key.length;
    var sub_index = 0;
    if (typeof len === 'number') {
        if (_len > len) {
            sub_index = (_len - len) / 2 - 1;
        }
    }
    for (var i = 0; i < _len; i++) {
        var index = Math.ceil(Math.random() * (_len - 1));
        var char_code = _key[index];
        result += char_code;
    }
    result = result.substr(sub_index, len);
    return result;
}

function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '').replace(/[\r\n\t]/g, '');
}

function isNumber (charCodes) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(charCodes)) {
        return true;
    } else {
        return false;
    }
}

function codeEncrypt (code) {
    if (code == undefined || code == '') {
        return code;
    }
    var tmp_secret = config.domain == undefined ? outerParamKey : config.domain;
    var new_data = code;
    if (tmp_secret == new_data.substr(0, tmp_secret.length)) {
        return code;
    }
    try {
        new_data = getEncAse192(new_data, tmp_secret);
        new_data = tmp_secret + new_data;
    } catch (e) {
        // console.log(e)
        return code;
    }
    return new_data;
}

function codeDecrypt (code) {
    if (code == undefined || code == '') {
        return code;
    }
    var tmp_secret = config.domain == undefined ? outerParamKey : config.domain;
    var new_data = code;
    if (tmp_secret != new_data.substr(0, tmp_secret.length)) {
        return code;
    }
    try {
        new_data = getDecAse192(new_data.substring(tmp_secret.length), tmp_secret);
    } catch (e) {
        // console.log(e)
        return code;
    }
    return new_data;
}

function getExtendRandomCode () {
    return Math.random().toString().slice(2, 8);
}

function getEncryptCodeByMD5 (code, extendCode) {
    if (typeof extendCode == 'string') {
        code = code + ':' + extendCode;
    }
    var md5 = crypto.createHash('md5');
    var result = md5.update(code).digest('hex');
    return result;
}

function getExtendEncryptCodeByMD5 (code) {
    return getEncryptCodeByMD5(code, getExtendRandomCode());
}

function getHashResult (hexCode) {
    // 转成16进制，比如 0x4d 0xc9 ...
    hexCode = hexCode.replace(/(\w{2,2})/g, '0x$1 ').trim();
    // 转成16进制数组，如 [0x4d, 0xc9, ...]
    var arr = hexCode.split(' ');
    // 转成对应的buffer，如：<Buffer 4d c9 ...>
    var buff = Buffer.from(arr);
    var result = getEncryptCodeByMD5(buff);
    return result;
}

function getEncryptAes256cbcCode (code, key) {
    if (key == undefined) {
        key = code;
    }
    // var key="asdhjwheru*asd123-123";// 加密的秘钥
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(code, 'utf8', 'hex');
    crypted += cipher.final('hex');
    var message = crypted; // 加密之后的值
    return message;
}

function getdecryptAes256cbcCode (code, key) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var dec = decipher.update(code, 'hex', 'utf8');
    dec += decipher.final('utf8'); // 解密之后的值
    return dec;
}

function getEncAse192 (str, secret) {
    /**
     * @aes192加密模块
     * @param str string 要加密的字符串
     * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
     * @retrun string 加密后的字符串
     * */
    var cipher = crypto.createCipher('aes192', secret); // 设置加密类型 和 要使用的加密密钥
    var enc = cipher.update(str, 'utf8', 'hex'); // 编码方式从utf-8转为hex;
    enc += cipher.final('hex'); // 编码方式从转为hex;
    return enc; // 返回加密后的字符串
}

function getDecAse192 (str, secret) {
    /**
     * @aes192解密模块
     * @param str string 要解密的字符串
     * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
     * @retrun string 解密后的字符串
     * */
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8'); // 编码方式从hex转为utf-8;
    dec += decipher.final('utf8'); // 编码方式从utf-8;
    return dec;
}

function getSecretCode () {
    var len = 10;
    var flag = true;
    while (flag) {
        len = Math.floor(Math.random() * 100);
        if (len > 10 && len < 100) {
            flag = false;
        }
    }
    var _key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var _len = _key.length;
    var result = '';
    for (var i = 0; i < len; i++) {
        var index = Math.ceil(Math.random() * (_len - 1));
        var char_code = _key[index];
        result += char_code;
    }
    result = result.toLowerCase();
    return {
        lenNum: len,
        secretCode: result
    };
}

function outputJsonResultWithCompile (resultOpt) {
    var msg = JSON.stringify(resultOpt);
    var code = '{}';
    try {
        var secretOpt = getSecretCode();
        code = getEncAse192(msg, secretOpt.secretCode);
        code = secretOpt.secretCode + code + secretOpt.lenNum;
        return code;
    } catch (e) {
        // console.log('参数解析异常：');
        // console.log(e);
        // console.log('解析异常打印结束。。。。。');
        return code;
    }
}

function parseJsonResult (code) {
    if (code == undefined || code == null) {
        return null;
    }
    var len = code.substr(-2, 2);
    var tmp_len = len.length;
    len = parseInt(len);
    var tmp_secret = code.substr(0, len);
    var _msg = code.substring(len, code.length - tmp_len);
    _msg = getDecAse192(_msg, tmp_secret);
    var result = null;
    try {
        result = JSON.parse(_msg);
    } catch (e) {
        // console.log(e)
    }
    return result;
}

function getPostParamOption (paramMsg) {
    var condition = {};
    if (typeof paramMsg === 'object') {
        paramMsg = JSON.stringify(paramMsg);
    } else if (typeof paramMsg !== 'string') {
        return paramMsg;
    }
    var secretOpt = getSecretCode();
    var code = getEncAse192(paramMsg, secretOpt.secretCode);
    code = secretOpt.secretCode + code + secretOpt.lenNum;
    condition[outerParamKey] = code;
    return condition;
}

function CompileCode () {
    var _self = this;
    _self.markApendStrLen = markApendStrLen;
    _self.outerParamKey = outerParamKey;
    _self.isProd = isProd;
    _self.key_words = key_words;
    _self.desc = desc;
    _self.getRandomSerialNumber = getRandomSerialNumber;
    _self.trim = trim;
    _self.isNumber = isNumber;
    _self.codeEncrypt = codeEncrypt;
    _self.codeDecrypt = codeDecrypt;
    _self.getExtendRandomCode = getExtendRandomCode;
    _self.getEncryptCodeByMD5 = getEncryptCodeByMD5;
    _self.getExtendEncryptCodeByMD5 = getExtendEncryptCodeByMD5;
    _self.getHashResult = getHashResult;
    _self.getEncryptAes256cbcCode = getEncryptAes256cbcCode;
    _self.getdecryptAes256cbcCode = getdecryptAes256cbcCode;
    _self.getEncAse192 = getEncAse192;
    _self.getDecAse192 = getDecAse192;
    _self.getSecretCode = getSecretCode;
    _self.outputJsonResultWithCompile = outputJsonResultWithCompile;
    _self.parseJsonResult = parseJsonResult;
    _self.getPostParamOption = getPostParamOption;
}

module.exports = new CompileCode();
