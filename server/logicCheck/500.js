var path = require('path');
module.exports = function(req, res, next) {
	var err = new Error('Not Found');
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	if (req.method == 'GET') {
		res.status(500).sendFile(path.join(__dirname, '../pubic/500/index.html'));
		// res.status(err.status || 404).end('{error: "the reqeust is gone!"}')
	} else if (req.method == 'POST') {
		res.status(err.status || 500).end('{error:"sorry,the server is found error!"}');
	}
};