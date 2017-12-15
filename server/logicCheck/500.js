var path = require('path');
module.exports = function(req, res, next) {
	// set locals, only providing error in development
	// console.error(err.stack);
	var err = new Error('Not Found');
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	// res.status(err.status || 500);
	// res.render('error');
	// res.status(err.status || 500).sendFile(path.join(__dirname, '../../client/500/index.html'));
	// res.status(err.status || 500).end('{error:"the server is error!"}');
	if (req.method == 'GET') {
		res.status(500).sendFile(path.join(__dirname, '../pubic/500/index.html'));
		// res.status(err.status || 404).end('{error: "the reqeust is gone!"}')
	} else if (req.method == 'POST') {
		res.status(err.status || 500).end('{error:"sorry,the server is found error!"}');
	}
};