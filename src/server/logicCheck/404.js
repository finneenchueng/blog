var path = require('path');
module.exports = function (req, res, next) {
    var err = new Error('Not Found');
    if (req.method == 'GET') {
        res.status(404).sendFile(path.join(__dirname, '../public/404/index.html'));
    } else if (req.method == 'POST') {
        res.status(404).end('{error: "the request url is not found!"}');
    }
};
