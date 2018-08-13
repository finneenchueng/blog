var path = require('path');
// 图片请求路径
module.exports = function (req, res, next) {
    var pic_id = req.params.id;
    var pic_name = req.params.picName;
    res.sendFile(path.join(__dirname, '../../picture/' + pic_id + '/' + pic_name));
};

