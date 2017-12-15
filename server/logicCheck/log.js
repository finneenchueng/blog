var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var config = require('./config');
var logger = require('morgan');
var uuid = require('node-uuid')
var path = require('path');
var msgTool = require("./compile");
module.exports = {
	logFilePath: path.join(__dirname, '../log'),
	logFileName: 'access-%DATE%.log',
	regularRecord: function(app) {
		var _self = this;
		var logDirectory = _self.logFilePath;
		var logFileName = _self.logFileName;
		if (config.isProd) {
			function assignId(req, res, next) {
				req.id = uuid.v4()
				next()
			}

			function assignCode(req, res, next) {
				req.randomCode = uuid.v1()
				next()
			}
			logger.token('id', function getId(req) {
				
				return req.id
			})
			logger.token('randomCode', function getId(req) {
				return req.randomCode
			})
			fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
			var accessLogStream = FileStreamRotator.getStream({
					date_format: 'YYYYMMDD',
					filename: path.join(logDirectory, logFileName),
					frequency: 'daily',
					verbose: false
				})
				// app.use(logger('combined', {
				// 	stream: accessLogStream
				// }))
			app.use(assignId)
			app.use(assignCode)
			app.use(logger(':id,:remote-addr,:remote-user,[:date[web]],:method,:url,:randomCode,HTTP/:http-version,:status,:res[content-length],:response-time[digits],:referrer,:user-agent', {
				stream: accessLogStream
			}));
		} else {
			app.use('/page/detail',function(err,req, res, next) {
				console.log('get id......')
				console.log(req.body)
			});
			app.use(logger('dev'));
			// app.use(assignId)
			// app.use(assignCode)
			// app.use(logger(':id :remote-addr - :remote-user [:date[web]] ":method :url :randomCode HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
		}


	},
	postParamsRecord: function(req) {
		if (!config.isProd) {
			return;
		}
		var _self = this;
		var logDirectory = _self.logFilePath;
		var preFileName = _self.logFileName;
		var _date = new Date();
		var _names = [];
		_names.push(_date.getFullYear());
		_names.push((_date.getMonth() + 1));
		_names.push(_date.getDate() < 10 ? ('0' + _date.getDate()) : _date.getDate());
		// var curfileName = _date.getFullYear() + '' + (_date.getMonth() + 1) + '' + _date.getDate() < 10 ? ('0' + _date.getDate()) : _date.getDate();
		var curfileName = _names.join('');
		curfileName = preFileName.replace('%DATE%', curfileName);
		fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
		var fullpath = path.join(logDirectory, curfileName);
		try {
			if (fs.existsSync(fullpath)) {
				var result_arr = [];
				if (req != undefined) {
					if (req.method == 'POST') {
						// result_arr.push('\n');
						result_arr.push(req.id);
						var appendParams = '';
						var param_key = req.body[msgTool.outerParamKey];
						if (param_key == undefined) {
							appendParams = JSON.stringify(req.body);
						} else {
							appendParams = msgTool.outerParamKey;
							param_key = JSON.stringify(msgTool.parseJsonResult(param_key));
							appendParams += '=' + param_key;
						}
						result_arr.push(appendParams);
						result_arr.push('extendPost\n');
					}
				}
				// console.log(result_arr.join(','))
				if (result_arr.length > 0) {
					fs.appendFile(fullpath, result_arr.join(','), function(err) {
						if(err!=null){
							console.log(err)
						}
						
					});
				}

			}
		} catch (e) {

		}

	}

}