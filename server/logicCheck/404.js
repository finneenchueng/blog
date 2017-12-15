var path = require('path');
module.exports = function(req, res, next) {
  var err = new Error('Not Found');
  // err.status = 404;
  // console.error(err.stack);
  // next(err);
  // res.status(404).send('Sorry cant find that!');
  // res.status(404).render("common/404/index.html");
  // console.log(req.method)
  if (req.method == 'GET') {
    res.status(404).sendFile(path.join(__dirname, '../public/404/index.html'));
    // res.status(err.status || 404).end('{error: "the reqeust is gone!"}')
  } else if (req.method == 'POST') {
    res.status(404).end('{error: "the request url is not found!"}')
  }

};