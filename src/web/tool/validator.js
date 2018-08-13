export default {
    idcard: { // 验证身份证
        validator: function (value) {
//            	return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
            return value.identityCodeValid();
        },
        message: '身份证号码格式不正确'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少{0}个字符.'
    },
    maxLength: {
        validator: function (value, param) {
            return value.length < param[0];
        },
        message: '请输入最长{0}个字符.'
    },
    length: {
        validator: function (value, param) {
            var len = value.trim().length;
            return len >= param[0] && len <= param[1];
        },
        message: '输入内容长度必须介于{0}和{1}之间.'
    },
    lengthOnly: {
        validator: function (value, param) {
            var len = value.trim().length;
            return len == param[0];
        },
        message: '输入内容长度必须{0}位.'
    },
    numberOnly: {
        validator: function (value, param) {
            var reg_str = '\^\\d$';
            // 参数param[0]为0时只验证数字类型，大于0验证数字类长度
            if (param[0] > 0) {
                reg_str = '\^\\d{' + param[0] + '}$';
            }
            var reg = new RegExp(reg_str, 'g');
            var flag = reg.test(value);
            return flag;
        },
        message: '输入内容为数字类型且长度必须{0}位.'
    },
    teleNum: { // 验证手机号码+固定电话
        validator: function (value) {
            var flag = /^([0-9]{3,4}-)?[0-9]{7,8}$/i.test(value);
            if (!flag) {
                flag = /^(13|15|17|18)\d{9}$/i.test(value);
            }
            return flag;
        },
        message: '电话号码格式不正确,固定电话形如：0571-88888888或139xxxxxxxx'
    },
    phone: { // 验证固定电话号码
        validator: function (value) {
            return /^([0-9]{3,4}-)?[0-9]{7,8}$/i.test(value);
        },
        message: '电话号码格式不正确,请使用下面格式:0571-88888888'
    },
    mobile: { // 验证手机号码
        validator: function (value) {
            return /^(13|15|17|18)\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确,请使用下面格式:139xxxxxxxx'
    },
    integer: { // 验证整数
        validator: function (value) {
            return /^[+]?[1-9]+\d*$/i.test(value);
        },
        message: '请输入整数'
    },
    intOrFloat: { // 验证整数或小数
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    currency: { // 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    qq: { // 验证QQ,从10000开始
        validator: function (value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message: 'QQ号码格式不正确'
    },
    gtzero: {
        validator: function (value) {
            var flag = false;
            if (/^\d+(\.\d+)?$/i.test(value)) {
                flag = parseFloat(value) > 0;
            }
            return flag;
        },
        message: '请输入大于0的数值'
    },
    age: { // 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },
    chinese: { // 验证中文
        validator: function (value) {
            // /^[\u4e00-\u9fa5]{2,4}/
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: { // 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    unnormal: { // 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    special: { // 验证特殊字符输入
        validator: function (value) {
            //  [`~!@\$\^&\*()=\|{}':;',\"\.\<\>\/\?！￥……（）—【】‘；：”“'。，、？\\]
            // return /[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/i.test(value);
            return /[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?！￥……（）—【】‘；：”“'。，、？\\]+$/i.test(value);
        },
        message: '输入值不能包含特殊字符'
    },
    username: { // 验证用户名
        validator: function (value) {
            return /^[a-zA-Z]{1}[0-9a-zA-Z_]{1,19}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许2-20字节，允许字母数字下划线）'
    },
    faxno: { // 验证传真
        validator: function (value) {
            //           return /^[+]{0,1}(\d){1,3}[]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: { // 验证邮政编码
        validator: function (value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: { // 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    name: { // 验证姓名，可以是中文或英文
        validator: function (value) {
//                return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
            return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[-]|[\w]){1,20}$/i.test(value);
        },
        message: '请输入姓名'
    },
    date: { // 验证日期
        validator: function (value) {
            // 格式yyyy-MM-dd或yyyy-M-d
            return /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/i.test(value);
//            	if(value.indexOf("00:00:00")>-1){
//            		value=value.replace("00:00:00","").trim();
//            	}
//                return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '请输入合适的日期格式'
    },
    datetime: { // 验证时间
        validator: function (value) {
            // 格式yyyy-MM-dd HH:mm:ss
            return /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/i.test(value);
        },
        message: '请输入合适的时间格式'
    },
    dateortime: {
        validator: function (value) {
            var flag = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/i.test(value);
            if (!flag) {
                flag = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/i.test(value);
            }
            return flag;
        },
        message: '请输入合适的日期或时间格式'
    },
    email: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的电子邮箱(例：abc@hotnail(msn/live).com)'
    },
    equalTo: {
        validator: function (value, param) {
            var input_ele = document.querySelector('#' + param);
            var v_input = input_ele.value;
            return value == v_input.trim();
        },
        message: '两次输入的密码不一致！'
    }
};
