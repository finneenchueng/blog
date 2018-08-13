module.exports = function () {
    var _key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    var _len = _key.length;
    for (var i = 0; i < _len; i++) {
        var index = Math.ceil(Math.random() * (_len - 1));
        var char_code = _key[index];
        result += char_code;
    }
    return result;
};
